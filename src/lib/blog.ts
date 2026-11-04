import { z } from 'zod';

export const postInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(180),
  slug: z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words separated by hyphens.'),
  excerpt: z.string().trim().max(500),
  category: z.string().trim().min(1).max(80),
  content: z.string().max(100000),
  status: z.enum(['draft', 'published']),
}).refine(p => p.status !== 'published' || p.content.trim().length > 0, {
  message: 'Add article text before publishing.', path: ['content'],
});
export type PostInput = z.infer<typeof postInput>;
export function slugify(title: string) {
  return title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
export function readingTime(content: string) {
  return `${Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))} min read`;
}
export function blogHead(title: string, description: string, privatePage = false) {
  return { meta: [
    { title: `${title} — Neine Arora` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} — Neine Arora` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: privatePage ? 'website' : 'article' },
    { name: 'twitter:card', content: 'summary' },
    ...(privatePage ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
  ] };
}