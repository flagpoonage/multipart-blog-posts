import { BlogPostIndex } from '@apptypes';

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

export const APIRoutes = {
  getIndex: (): string => `${server_path}/post-index`,
  getPostContent: (id: string): string => `${server_path}/post/${id}`,
  postCreatePost: (): string => `${server_path}/post`,
};

export async function getPostIndex(): Promise<BlogPostIndex> {
  return fetchAsJson(APIRoutes.getIndex());
}

export async function getPostContent(postId: string): Promise<string> {
  return fetchAsText(APIRoutes.getPostContent(postId));
}
