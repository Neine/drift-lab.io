import { useRef, useState } from 'react';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useQueryClient, useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Save, Send, Trash2, Eye, Pencil, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getEditorPosts, saveBlogPost, deleteBlogPost } from '@/lib/blog.functions';
import { blogHead, slugify, postInput, type PostInput } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArticleBody } from '@/components/portfolio/ArticleBody';
import { BlogMediaUpload } from '@/components/portfolio/BlogMediaUpload';
import { insertMedia } from '@/lib/blog-media';

const editorOptions = queryOptions({ queryKey: ['editor-posts'], queryFn: () => getEditorPosts(), staleTime: 0 });
const emptyPost: PostInput = { title: '', slug: '', category: 'Insights', excerpt: '', content: '', status: 'draft' };
export const Route = createFileRoute('/_authenticated/blog-editor')({
  head: () => blogHead('Blog editor', 'Write and publish Neine Arora’s original articles.', true),
  loader: ({ context }) => context.queryClient.ensureQueryData(editorOptions),
  component: BlogEditor,
});
function BlogEditor() {
  const { data } = useSuspenseQuery(editorOptions);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [form, setForm] = useState<PostInput>(emptyPost);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [mediaBusy, setMediaBusy] = useState(false);
  const articleInput = useRef<HTMLTextAreaElement>(null);
  const cursorPosition = useRef<number | null>(null);
  async function refresh() { await queryClient.invalidateQueries({ queryKey: ['editor-posts'] }); await queryClient.invalidateQueries({ queryKey: ['published-posts'] }); await queryClient.invalidateQueries({ queryKey: ['article'] }); }
  async function save(status: 'draft' | 'published') {
    const parsed = postInput.safeParse({ ...form, status });
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? 'Check your article details.'); return; }
    setBusy(true);
    try {
      const saved = await saveBlogPost({ data: parsed.data });
      setForm({ id: saved.id, title: saved.title, slug: saved.slug, category: saved.category, excerpt: saved.excerpt, content: saved.content, status: saved.status === 'published' ? 'published' : 'draft' });
      await refresh(); toast.success(status === 'published' ? 'Published in Notes & Insights.' : 'Draft saved.');
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not save your article.'); }
    finally { setBusy(false); }
  }
  async function remove() {
    if (!form.id || !window.confirm('Delete this article permanently?')) return;
    setBusy(true);
    try { await deleteBlogPost({ data: { id: form.id } }); setForm(emptyPost); await refresh(); toast.success('Article deleted.'); }
    catch (error) { toast.error(error instanceof Error ? error.message : 'Could not delete article.'); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-background text-foreground px-6 py-8">
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-wrap justify-between items-center gap-4 border-b border-border pb-6 mb-8">
        <div><Button asChild variant="link" className="px-0"><Link to="/">← Notes & Insights</Link></Button><h1 className="text-3xl mt-2">Blog editor</h1></div>
        <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); queryClient.removeQueries({ queryKey: ['editor-posts'] }); await router.invalidate(); }}><LogOut />Sign out</Button>
      </header>
      {!data.allowed ? <div className="max-w-xl py-12"><h2 className="text-2xl mb-3">Editor access pending</h2><p className="text-muted-foreground leading-relaxed">This account does not have publishing access. Ask Neine to approve it before creating articles.</p></div> : <div className="grid md:grid-cols-[240px_minmax(0,1fr)] gap-8">
        <aside><Button className="w-full mb-5" onClick={() => { setForm(emptyPost); setPreview(false); }} disabled={busy}><Plus />New post</Button><div className="divide-y divide-border">{data.posts.map(post => <Button key={post.id} variant="ghost" className="w-full h-auto py-4 justify-start whitespace-normal text-left" disabled={busy} onClick={() => { setForm({ id: post.id, title: post.title, slug: post.slug, category: post.category, excerpt: post.excerpt, content: post.content, status: post.status === 'published' ? 'published' : 'draft' }); setPreview(false); }}><span><span className="block">{post.title}</span><span className="text-xs text-muted-foreground capitalize">{post.status}</span></span></Button>)}{data.posts.length === 0 && <p className="text-sm text-muted-foreground py-4">No articles yet.</p>}</div></aside>
        <section className="min-w-0">
          <div className="flex flex-wrap gap-2 items-center mb-6">
            <span className="text-xs uppercase text-gold mr-auto">{form.status}</span>
            <Button variant="outline" size="sm" disabled={mediaBusy} onClick={() => setPreview(!preview)}>{preview ? <Pencil /> : <Eye />}{preview ? 'Write' : 'Preview'}</Button>
            <Button variant="outline" size="sm" disabled={busy || mediaBusy} onClick={() => save('draft')}><Save />{form.status === 'published' ? 'Unpublish' : 'Save draft'}</Button>
            <Button size="sm" disabled={busy || mediaBusy} onClick={() => save('published')}><Send />{form.status === 'published' ? 'Update post' : 'Publish'}</Button>
            {form.id && <Button variant="ghost" size="icon" aria-label="Delete article" title="Delete article" disabled={busy} onClick={remove}><Trash2 /></Button>}
          </div>
          {preview ? <article className="max-w-3xl"><p className="text-gold text-xs uppercase mb-3">{form.category}</p><h2 className="text-4xl break-words mb-4">{form.title || 'Untitled article'}</h2><p className="text-muted-foreground mb-8">{form.excerpt}</p><ArticleBody content={form.content} /></article> : <div className="space-y-6">
            <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: !form.id && form.slug === slugify(form.title) ? slugify(e.target.value) : form.slug })} maxLength={180} /></div>
            <div className="grid sm:grid-cols-2 gap-5"><div className="space-y-2"><Label htmlFor="slug">Article URL</Label><Input id="slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} /></div><div className="space-y-2"><Label htmlFor="category">Category</Label><Input id="category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} maxLength={80} /></div></div>
            <div className="space-y-2"><Label htmlFor="excerpt">Excerpt</Label><Textarea id="excerpt" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} maxLength={500} rows={3} /></div>
            <div className="space-y-2"><div className="flex items-center justify-between gap-2"><Label htmlFor="content">Article</Label><BlogMediaUpload disabled={busy || mediaBusy} onBusyChange={setMediaBusy} onInsert={markdown => { setForm(current => ({ ...current, content: insertMedia(current.content, markdown, cursorPosition.current ?? current.content.length) })); cursorPosition.current = null; }} /></div><Textarea ref={articleInput} id="content" className="min-h-96 leading-relaxed" value={form.content} onSelect={e => { cursorPosition.current = e.currentTarget.selectionStart; }} onChange={e => setForm({ ...form, content: e.target.value })} /></div>
          </div>}
          {form.id && form.status === 'published' && <Button asChild variant="link" className="mt-5 px-0"><Link to="/blog/$slug" params={{ slug: form.slug }}>View published article →</Link></Button>}
        </section>
      </div>}
    </div>
  </main>;
}