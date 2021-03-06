import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { BlogFileMeta } from 'src/types';
import { parseISO, format } from 'date-fns';

interface Props {
  id: string;
  post: BlogFileMeta;
}

export function IndexedPost({ post, id }: Props): ReactElement {
  return (
    <article className="pd-y2">
      <Link className="f-b f-s-h2 f-2lh" to={`/post/${id}`}>
        {post.title}
      </Link>
      <div className="f-s-sm1 f-2elh c-tx-l2">{format(parseISO(post.created), 'EEEE, do MMMM yyyy')}</div>
    </article>
  );
}
