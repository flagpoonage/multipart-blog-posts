import React, { ReactElement, useState } from 'react';
import { BlogPostIndex, SortedIndex, SortKey, SortOrder } from '@apptypes';
import { IndexedPost } from '@editor-components/IndexedPost/IndexedPost';
interface Props {
  index: BlogPostIndex;
}

export function getSortedList(key: SortKey, order: SortOrder, index: SortedIndex): string[] {
  return index[key][order];
}

export function PostIndexList({ index }: Props): ReactElement {
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [sortKey, setSortKey] = useState<SortKey>('created');

  const sortedValues = index[sortKey][sortOrder];

  return (
    <div className="pd-y">
      <div className="mg-b">
        <select className="pd-xy4" value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
          <option value="created">{'Created Date'}</option>
          <option value="alpha">{'Title'}</option>
          <option value="updated">{'Updated Date'}</option>
        </select>
        <select className="pd-xy4 mg-x" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as SortOrder)}>
          <option value="desc">{'Descending Order'}</option>
          <option value="asc">{'Ascending Order'}</option>
        </select>
      </div>
      {sortedValues.map((value) => {
        const post = index.files[value];
        return <IndexedPost key={value} id={value} post={post} />;
      })}
    </div>
  );
}
