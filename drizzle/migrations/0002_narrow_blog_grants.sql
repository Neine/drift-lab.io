REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.blog_posts FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.user_roles FROM anon, authenticated;
REVOKE SELECT ON public.user_roles FROM anon;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON public.blog_posts FROM authenticated;
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;