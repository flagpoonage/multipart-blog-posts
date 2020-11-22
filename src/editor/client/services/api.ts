import { BlogPostIndex } from 'src/types';

const server_path = `http://localhost:8081`;

export async function fetchAsJson<T>(url: string, options?: RequestInit): Promise<T> {
  const req = await fetch(url, options);
  const res = await req.json();
  return res;
}

export async function fetchAsText(url: string, options?: RequestInit): Promise<string> {
  const req = await fetch(url, options);
  const blob = await req.blob();
  const text = await blob.text();
  return text;
}

export async function getPostIndex(): Promise<BlogPostIndex> {
  return fetchAsJson(`${server_path}/post-index`);
}

export async function getPostContent(postId: string): Promise<string> {
  return fetchAsText(`${server_path}/post/${postId}`);
}
