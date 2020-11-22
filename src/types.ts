export interface BlogFileSection {
  tag: string;
  content: string;
}

export interface BlogFileMetaSection extends BlogFileSection {
  tag: 'meta';
}

export interface BlogFileMeta extends Record<string, unknown> {
  author: string;
  created: string;
  updated: string;
  title: string;
  tags: string[];
}

export interface BlogFileContent {
  meta: BlogFileMeta;
  sections: BlogFileSection[];
}

export interface BlogFile extends BlogFileContent {
  id: string;
  boundary: string;
}

export interface BlogFileRaw {
  id: string;
  content: Buffer;
}

export interface BlogMetaVariable {
  key: string;
  value: string;
}

export interface BlogPostSortIndex {
  desc: string[];
  asc: string[];
}

export interface SortedIndex {
  alpha: BlogPostSortIndex;
  created: BlogPostSortIndex;
  updated: BlogPostSortIndex;
}

export interface BlogPostIndex extends SortedIndex {
  files: Record<string, BlogFileMeta>;
}

export type SortOrder = keyof BlogPostSortIndex;
export type SortKey = keyof SortedIndex;
