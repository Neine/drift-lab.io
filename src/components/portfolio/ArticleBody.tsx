import ReactMarkdown from 'react-markdown';
import { defaultUrlTransform } from 'react-markdown';
import { BlogImage } from './BlogImage';
import { BLOG_MEDIA_PREFIX } from '@/lib/blog-media';
export function ArticleBody({ content }: { content: string }) {
  return <div className="article-body break-words"><ReactMarkdown skipHtml urlTransform={(url, key) => key === 'src' && url.startsWith(BLOG_MEDIA_PREFIX) ? url : defaultUrlTransform(url)} components={{ img: ({ src, alt, title }) => <BlogImage src={src} alt={alt} title={title} />, a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> }}>{content}</ReactMarkdown></div>;
}