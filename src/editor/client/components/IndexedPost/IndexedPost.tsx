import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { BlogFileMeta } from 'src/types';
import { parse, format } from 'date-fns';

interface Props {
  id: string;
  post: BlogFileMeta;
}

export function IndexedPost({ post, id }: Props): ReactElement {
  return (
    <article className="pd-y2">
      <Link className="f-b f-s-h2 f-lh-2" to={`/post/${id}`}>
        {post.title}
      </Link>
      <div className="f-s-small f-lh-2e c">
        {format(parse(post.created, 'yyyy-MM-dd', new Date()), 'EEEE, do MMMM yyyy')}
      </div>
    </article>
  );
}
