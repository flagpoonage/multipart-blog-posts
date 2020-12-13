import { BlogFile } from '@apptypes';
import React, { ReactElement, useEffect, useState } from 'react';

function useExternalUpdate() {
  const [data, setData] = useState<BlogFile>();
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === 'postContentUpdate') {
        console.log('Post content updated', e.data);
        setData(e.data.data);
      }
    };
    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return data;
}

export function PostPreview(): ReactElement | null {
  const blogPost = useExternalUpdate();
  return blogPost ? (
    <div className="preview-container">
      <article className="blog-post" style={{ color: 'white' }}>
        <h1>{blogPost.meta.title}</h1>
      </article>
    </div>
  ) : null;
}
