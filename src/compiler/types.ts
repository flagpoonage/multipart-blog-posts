export interface BlogFileSection {
  tag: string;
  content: string;
}

export interface BlogFileMetaSection extends BlogFileSection {
  tag: 'meta';
}

export interface BlogFile {
  meta: Record<string, string>;
  sections: BlogFileSection[];
}

export interface BlogMetaVariable {
  key: string;
  value: string;
}
