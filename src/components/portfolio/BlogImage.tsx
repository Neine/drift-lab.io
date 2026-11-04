import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BLOG_MEDIA_BUCKET, BLOG_MEDIA_PREFIX } from '@/lib/blog-media';
export function BlogImage({ src, alt, title }: { src?: string; alt?: string; title?: string }) {
  const path = src?.startsWith(BLOG_MEDIA_PREFIX) ? src.slice(BLOG_MEDIA_PREFIX.length) : '';
  const { data: url, isError } = useQuery({
    queryKey: ['blog-media-url', path], enabled: Boolean(path), staleTime: 45000, retry: 1,
    queryFn: async () => {
      const { data, error } = await supabase.storage.from(BLOG_MEDIA_BUCKET).createSignedUrl(path, 60);
      if (error) throw new Error(error.message);
      return data.signedUrl;
    },
  });
  const resolved = path ? url : src;
  return <span className="block my-6">
    {resolved ? <img src={resolved} alt={alt ?? ''} className="w-full h-auto rounded-md" loading="lazy" /> : <span role="status" className="block bg-muted p-6 text-sm text-muted-foreground rounded-md">{isError ? 'Image unavailable' : 'Loading image…'}</span>}
    {title && <span className="block mt-2 text-center text-sm text-muted-foreground">{title}</span>}
  </span>;
}