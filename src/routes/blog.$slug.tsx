import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { articleOptions } from '@/lib/blog.queries';
import { blogHead, readingTime } from '@/lib/blog';
import { ArticleBody } from '@/components/portfolio/ArticleBody';
import { Button } from '@/components/ui/button';

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
  if (!post) return null;
  return <main className="min-h-screen bg-background text-foreground px-6 py-10 md:py-16"><article className="max-w-3xl mx-auto">
    <Button asChild variant="link" className="px-0 mb-12"><Link to="/">← Notes & Insights</Link></Button>
    <p className="text-xs uppercase text-gold mb-5">{post.category}</p>
    <h1 className="text-3xl md:text-5xl leading-tight break-words mb-6">{post.title}</h1>
    <p className="text-muted-foreground text-sm mb-8">Neine Arora · {post.published_at ? new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : ''} · {readingTime(post.content)}</p>
    {post.excerpt && <p className="text-lg leading-relaxed text-foreground mb-10 border-b border-border pb-8">{post.excerpt}</p>}
    <ArticleBody content={post.content} />
  </article></main>;
}