import { BlogFile, BlogFileMeta, BlogPostIndex } from '@apptypes';
import { loadFilesFromGlob } from './loader';

type SortFunction = (a: BlogFile, b: BlogFile) => number;

const makeSort = (comparisonFinder: (a: BlogFile) => string, direction: 'asc' | 'desc'): SortFunction => {
  return (a: BlogFile, b: BlogFile): number => {
    const compareA = comparisonFinder(a);
    const compareB = comparisonFinder(b);
    if (compareA > compareB) {
      return direction === 'asc' ? 1 : -1;
    }

    if (compareA < compareB) {
      return direction === 'asc' ? -1 : 1;
    }

    return 0;
  };
};

export const sortTitleDescending = makeSort((a) => a.meta.title, 'desc');
export const sortCreatedDescending = makeSort((a) => a.meta.created, 'desc');
export const sortUpdatedDecending = makeSort((a) => a.meta.updated, 'desc');
export const sortTitleAscending = makeSort((a) => a.meta.title, 'asc');
export const sortCreatedAscending = makeSort((a) => a.meta.created, 'asc');
export const sortUpdatedAscending = makeSort((a) => a.meta.updated, 'asc');

export function makePostIndex(files: BlogFile[]): BlogPostIndex {
  const sortIds = (sorter: SortFunction) => files.sort(sorter).map((file: BlogFile) => file.id);
  return {
    files: files.reduce((acc: Record<string, BlogFileMeta>, val: BlogFile) => {
      acc[val.id] = val.meta;
      return acc;
    }, {} as Record<string, BlogFileMeta>),
    alpha: {
      desc: sortIds(sortTitleDescending),
      asc: sortIds(sortTitleAscending),
    },
    created: {
      desc: sortIds(sortCreatedDescending),
      asc: sortIds(sortCreatedAscending),
    },
    updated: {
      desc: sortIds(sortUpdatedDecending),
      asc: sortIds(sortUpdatedAscending),
    },
  };
}

export async function getPostIndex(postsOrPath: string | BlogFile[]): Promise<BlogPostIndex> {
  const files = await (typeof postsOrPath === 'string' ? loadFilesFromGlob(postsOrPath) : postsOrPath);

  return makePostIndex(files);
}
