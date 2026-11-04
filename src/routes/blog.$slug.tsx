import { useEffect, useState } from 'react';
import { createFileRoute, Link, notFound, useNavigate } from '@tanstack/react-router';
import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { articleOptions } from '@/lib/blog.queries';
import { deleteBlogPost, isEditor } from '@/lib/blog.functions';
import { blogHead, readingTime } from '@/lib/blog';
import { ArticleBody } from '@/components/portfolio/ArticleBody';
import { Button } from '@/components/ui/button';
import { BlogEngagement } from '@/components/portfolio/BlogEngagement';

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params, context }) => {
    const post = await context.queryClient.ensureQueryData(articleOptions(params.slug));
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({ ...blogHead(loaderData?.title ?? 'Article unavailable', loaderData?.excerpt || 'Original notes on AI, banking and business transformation by Neine Arora.'),
    links: loaderData ? [{ rel: 'canonical', href: `https://drift-lab.io/blog/${loaderData.slug}` }] : [],
  }),
  component: ArticlePage,
});
function ArticlePage() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(articleOptions(slug));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => { supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session))); }, []);
  const { data: editor } = useQuery({ queryKey: ['is-editor'], queryFn: () => isEditor(), enabled: signedIn, staleTime: 60_000 });

  async function remove() {
    if (!post || !window.confirm('Delete this article permanently? It will also disappear from Notes & Insights.')) return;
    setDeleting(true);
    try {
      await deleteBlogPost({ data: { slug: post.slug } });
      await queryClient.invalidateQueries({ queryKey: ['published-posts'] });
      await queryClient.invalidateQueries({ queryKey: ['article'] });
      toast.success('Article deleted.');
      await navigate({ to: '/' });
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Could not delete article.'); }
    finally { setDeleting(false); }
  }

  if (!post) return null;
  return <main className="min-h-screen bg-background text-foreground px-6 py-10 md:py-16"><article className="max-w-3xl mx-auto">
    <Button asChild variant="link" className="px-0 mb-12"><Link to="/">← Notes & Insights</Link></Button>
    <p className="text-xs uppercase text-gold mb-5">{post.category}</p>
    <h1 className="text-3xl md:text-5xl leading-tight break-words mb-6">{post.title}</h1>
    <p className="text-muted-foreground text-sm mb-8">Neine Arora · {post.published_at ? new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : ''} · {readingTime(post.content)}</p>
    {post.excerpt && <p className="text-lg leading-relaxed text-foreground mb-10 border-b border-border pb-8">{post.excerpt}</p>}
    <ArticleBody content={post.content} />
    <BlogEngagement postId={post.id} isAdmin={Boolean(editor)} />
    {editor && <div className="flex flex-wrap gap-3 items-center mt-12 border-t border-border pt-6">
      <Button asChild variant="outline" size="sm"><span className="inline-flex items-center gap-2"><Pencil />Edit post</span></Button>
      <Button variant="outline" size="sm" disabled={deleting} onClick={remove}><Trash2 />{deleting ? 'Deleting…' : 'Delete post'}</Button>
    </div>}
  </article></main>;
}
