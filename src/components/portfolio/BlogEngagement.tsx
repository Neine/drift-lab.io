import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart, MessageCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type Props = { postId: string; isAdmin: boolean };

export function BlogEngagement({ postId, isAdmin }: Props) {
  const qc = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState('Reader');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      setUserId(u?.id ?? null);
      if (u) setName(String(u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'Reader').slice(0, 80));
    });
  }, []);

  const likes = useQuery({
    queryKey: ['blog-likes', postId],
    queryFn: async () => {
      const { data, error } = await supabase.from('blog_likes').select('user_id').eq('post_id', postId);
      if (error) throw error;
      return data ?? [];
    },
  });
  const comments = useQuery({
    queryKey: ['blog-comments', postId],
    queryFn: async () => {
      const { data, error } = await supabase.from('blog_comments').select('*').eq('post_id', postId).order('created_at', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const liked = Boolean(userId && likes.data?.some(l => l.user_id === userId));

  function signIn() {
    sessionStorage.setItem('auth-return', window.location.pathname);
    window.location.assign('/auth');
  }

  async function toggleLike() {
    if (!userId) return signIn();
    const { error } = liked
      ? await supabase.from('blog_likes').delete().eq('post_id', postId).eq('user_id', userId)
      : await supabase.from('blog_likes').insert({ post_id: postId, user_id: userId });
    if (error) toast.error('Could not update like.');
    await qc.invalidateQueries({ queryKey: ['blog-likes', postId] });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return signIn();
    const text = body.trim();
    if (!text) return;
    if (text.length > 2000) return toast.error('Comments can be up to 2000 characters.');
    setBusy(true);
    const { error } = await supabase.from('blog_comments').insert({ post_id: postId, user_id: userId, author_name: name, body: text });
    setBusy(false);
    if (error) return toast.error('Could not post comment.');
    setBody('');
    await qc.invalidateQueries({ queryKey: ['blog-comments', postId] });
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this comment?')) return;
    const { error } = await supabase.from('blog_comments').delete().eq('id', id);
    if (error) toast.error('Could not delete comment.');
    await qc.invalidateQueries({ queryKey: ['blog-comments', postId] });
  }

  const count = likes.data?.length ?? 0;
  const list = comments.data ?? [];

  return <section className="mt-12 border-t border-border pt-8" aria-label="Likes and comments">
    <div className="flex items-center gap-4 mb-8">
      <Button variant={liked ? 'default' : 'outline'} size="sm" onClick={toggleLike} aria-pressed={liked}>
        <Heart className={liked ? 'fill-current' : ''} />{count} {count === 1 ? 'like' : 'likes'}
      </Button>
      <span className="text-sm text-muted-foreground inline-flex items-center gap-2"><MessageCircle className="size-4" />{list.length} {list.length === 1 ? 'comment' : 'comments'}</span>
    </div>

    <h2 className="text-xl mb-4">Comments</h2>
    {userId ? <form onSubmit={submit} className="space-y-3 mb-8">
      <Textarea value={body} onChange={e => setBody(e.target.value)} maxLength={2000} placeholder={`Share your thoughts as ${name}…`} rows={3} />
      <Button type="submit" size="sm" disabled={busy || !body.trim()}>{busy ? 'Posting…' : 'Post comment'}</Button>
    </form> : <p className="text-sm text-muted-foreground mb-8"><button onClick={signIn} className="text-gold underline">Sign in</button> to like or comment.</p>}

    <ul className="space-y-6">
      {list.map(c => <li key={c.id} className="border-b border-border pb-4">
        <div className="flex items-center justify-between gap-3 mb-1">
          <p className="text-sm"><span className="text-foreground">{c.author_name}</span> <span className="text-muted-foreground">· {new Date(c.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></p>
          {(c.user_id === userId || isAdmin) && <Button variant="ghost" size="sm" onClick={() => remove(c.id)} aria-label="Delete comment"><Trash2 /></Button>}
        </div>
        <p className="text-foreground/80 whitespace-pre-wrap break-words">{c.body}</p>
      </li>)}
      {!list.length && !comments.isLoading && <li className="text-sm text-muted-foreground">No comments yet — be the first.</li>}
    </ul>
  </section>;
}
