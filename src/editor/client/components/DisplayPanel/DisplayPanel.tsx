import React, { ReactElement, useEffect, useRef } from 'react';
import { BlogFile } from '@apptypes';

interface DisplayPanelProps {
  post: BlogFile | undefined;
}

export function DisplayPanel({ post }: DisplayPanelProps): ReactElement {
  const postRef = useRef(post);

  useEffect(() => {
    postRef.current = post;
  }, [post]);

  const updateFn = (frame: Window) => {
    frame.postMessage(
      {
        type: 'postContentUpdate',
        data: postRef.current,
      },
      '*'
    );
  };

  useEffect(() => {
    const frames = (window.frames as unknown) as Record<string, Window>;
    const iframe = frames['preview-panel'];

    updateFn(iframe);

    const interval = window.setInterval(() => {
      updateFn(iframe);
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="h grow of-h">
      <iframe name="preview-panel" src="/preview.html" className="h w of-y"></iframe>
    </div>
  );
}
