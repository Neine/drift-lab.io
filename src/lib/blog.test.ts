import { describe, expect, it } from 'vitest';
import { postInput } from './blog';
const post = { title: 'Process Mining', slug: 'process-mining', excerpt: '', category: 'Insights', content: '', status: 'draft' };
describe('Article publishing', () => {
  it('allows saving an unfinished draft', () => { expect(postInput.parse(post).status).toBe('draft'); });
  it('requires article text for a published post', () => { expect(postInput.safeParse({ ...post, status: 'published' }).success).toBe(false); });
  it('accepts a finished published post', () => { expect(postInput.parse({ ...post, status: 'published', content: 'An original article.' }).status).toBe('published'); });
});