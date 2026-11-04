import { describe, it, expect } from 'vitest';
import { validateBlogMedia, mediaMarkdown, insertMedia, BLOG_MEDIA_LIMIT } from './blog-media';
describe('Blog media', () => {
  it.each(['image/jpeg', 'image/png', 'image/gif', 'image/webp'])('accepts %s without conversion', type => {
    expect(validateBlogMedia({ type, size: 500 })).toBeTruthy();
  });
  it('rejects active SVG files', () => { expect(() => validateBlogMedia({ type: 'image/svg+xml', size: 10 })).toThrow(); });
  it('rejects files above the upload limit', () => { expect(() => validateBlogMedia({ type: 'image/png', size: BLOG_MEDIA_LIMIT + 1 })).toThrow(); });
  it('keeps a caption and private media reference', () => {
    expect(mediaMarkdown('owner/image.gif', 'Animated process', 'Workflow')).toBe('![Animated process](blog-media://owner/image.gif "Workflow")');
  });
  it('inserts media at the selected writing position', () => {
    expect(insertMedia('First.Last.', '![Chart](blog-media://owner/chart.png)', 6)).toBe('First.\n\n![Chart](blog-media://owner/chart.png)\n\nLast.');
  });
});