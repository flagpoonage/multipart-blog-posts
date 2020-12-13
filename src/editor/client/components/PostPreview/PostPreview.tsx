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

export function PostPreview(): ReactElement {
  const blogPost = useExternalUpdate();
  return (
    <div className="preview-container">
      <article className="blog-post" style={{ color: 'white' }}>
        {JSON.stringify(blogPost)}
      </article>
    </div>
  );
}
