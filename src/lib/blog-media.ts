export const BLOG_MEDIA_BUCKET = 'blog-media';
export const BLOG_MEDIA_PREFIX = 'blog-media://';
export const BLOG_MEDIA_LIMIT = 10 * 1024 * 1024;
const extensions: Record<string, string> = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/webp': 'webp',
};
export function validateBlogMedia(file: { type: string; size: number }) {
  if (!extensions[file.type]) throw new Error('Choose a JPG, PNG, GIF or WebP image.');
  if (file.size === 0) throw new Error('This file is empty.');
  if (file.size > BLOG_MEDIA_LIMIT) throw new Error('Choose an image smaller than 10 MB.');
  return extensions[file.type];
}
export function mediaMarkdown(path: string, alt: string, caption: string) {
  const safeAlt = alt.replace(/[\[\]\\\r\n]/g, ' ').trim();
  const safeCaption = caption.replace(/["\\\r\n]/g, ' ').trim();
  return `![${safeAlt}](${BLOG_MEDIA_PREFIX}${path}${safeCaption ? ` "${safeCaption}"` : ''})`;
}
export function insertMedia(content: string, markdown: string, position: number) {
  const at = Math.max(0, Math.min(content.length, position));
  const before = content.slice(0, at);
  const after = content.slice(at);
  return `${before}${before ? '\n\n' : ''}${markdown}${after ? '\n\n' : ''}${after}`;
}