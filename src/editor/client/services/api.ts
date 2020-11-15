import { BlogPostIndex } from 'src/types';

export async function getPostIndex(): Promise<BlogPostIndex> {
  const req = await fetch('http://localhost:8081/post-index');
  return await req.json();
}
