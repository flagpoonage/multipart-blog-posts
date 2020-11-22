import React, { useState } from 'react';
import { BlogPostIndex, SortedIndex, SortKey, SortOrder } from '../../../../types';
import { IndexedPost } from '../IndexedPost/IndexedPost';

interface Props {
  index: BlogPostIndex;
}

export function getSortedList(key: SortKey, order: SortOrder, index: SortedIndex): string[] {
  return index[key][order];
}

export function PostIndexList({ index }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortKey, setSortKey] = useState<SortKey>('alpha');

  const sortedValues = index[sortKey][sortOrder];

  return (
    <div className="pd-y">
      {sortedValues.map((value) => {
        const post = index.files[value];
        return <IndexedPost key={value} id={value} post={post} />;
      })}
    </div>
  );
}
