import { queryOptions } from '@tanstack/react-query';
import { getPublishedPost, listPublishedPosts } from './blog.functions';
export const publishedPostsOptions = queryOptions({ queryKey: ['published-posts'], queryFn: () => listPublishedPosts(), staleTime: 0 });
export const articleOptions = (slug: string) => queryOptions({ queryKey: ['article', slug], queryFn: () => getPublishedPost({ data: { slug } }), staleTime: 0 });