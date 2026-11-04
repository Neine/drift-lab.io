import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { postInput } from './blog';

export const listPublishedPosts = createServerFn({ method: 'GET' }).handler(async () => {
  const { publicBlogClient } = await import('./blog.server');
  const { data, error } = await publicBlogClient().from('blog_posts').select('id,slug,title,excerpt,category,content,published_at').eq('status', 'published').order('published_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPublishedPost = createServerFn({ method: 'GET' })
  .inputValidator((input: unknown) => z.object({ slug: z.string().max(180) }).parse(input))
  .handler(async ({ data }) => {
    const { publicBlogClient } = await import('./blog.server');
    const result = await publicBlogClient().from('blog_posts').select('slug,title,excerpt,category,content,published_at').eq('slug', data.slug).eq('status', 'published').maybeSingle();
    if (result.error) throw new Error(result.error.message);
    return result.data;
  });

export const getEditorPosts = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data: allowed, error: roleError } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (roleError) throw new Error(roleError.message);
  if (!allowed) return { allowed: false, posts: [] };
  const { data, error } = await context.supabase.from('blog_posts').select('*').order('updated_at', { ascending: false });
  if (error) throw new Error(error.message);
  return { allowed: true, posts: data ?? [] };
});

export const saveBlogPost = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => postInput.parse(input))
  .handler(async ({ data, context }) => {
    const { data: allowed } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
    if (!allowed) throw new Error('Publishing is restricted to the website owner.');
    const { id, ...fields } = data;
    const result = id
      ? await context.supabase.from('blog_posts').update(fields).eq('id', id).select().single()
      : await context.supabase.from('blog_posts').insert({ ...fields, author_id: context.userId }).select().single();
    if (result.error) throw new Error(result.error.code === '23505' ? 'This article URL is already used. Choose another.' : result.error.message);
    return result.data;
  });

export const isEditor = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data: allowed, error } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (error) throw new Error(error.message);
  return allowed;
});

export const deleteBlogPost = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid().optional(), slug: z.string().max(180).optional() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: allowed } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
    if (!allowed) throw new Error('Publishing is restricted to the website owner.');
    if (!data.id && !data.slug) throw new Error('Provide an article id or URL to delete.');
    const query = context.supabase.from('blog_posts').delete();
    const { error } = data.id ? await query.eq('id', data.id) : await query.eq('slug', data.slug);
    if (error) throw new Error(error.message);
    return { success: true };
  });