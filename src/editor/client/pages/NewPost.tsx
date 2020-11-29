import React, { ReactElement, useState } from 'react';
import { CreateBlogPostFields, BlogFile } from '@apptypes';
import { Spinner } from '@editor-components/Spinner/Spinner';
import { APIRoutes } from '@api';
import { useApiPost } from '@hooks/use-api-post';

export function generateIdFromTitle(title: string): string {
  const parts = title.split(' ').filter((a) => !!a);

  return parts
    .map((a) => {
      return a.replaceAll(/[^A-Za-z0-9-]/g, '').toLowerCase();
    })
    .join('-');
}

export function NewPost(): ReactElement {
  const [useCustomId, setUseCustomId] = useState(false);
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [postResult, createPost] = useApiPost<CreateBlogPostFields, BlogFile>(APIRoutes.postCreatePost());

  const [, requestStatus, error] = postResult;

  const onUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    if (!useCustomId) {
      setId(generateIdFromTitle(e.target.value));
    }
  };

  const toggleCustomId = () => {
    if (useCustomId) {
      setId(generateIdFromTitle(title));
    }

    setUseCustomId(!useCustomId);
  };

  const onCreatePost = () => {
    createPost({ id, title });
  };

  const isValid = title && id;

  return (
    <div className="pd">
      <h1>Create New Post</h1>
      <div className="mg-y">
        <label htmlFor="title">Post Title</label>
        <div>
          <input type="text" value={title} onChange={onUpdateTitle} />
        </div>
      </div>
      <div className="mg-y">
        <label htmlFor="id">Post ID</label>
        <div>
          <input type="checkbox" checked={useCustomId} onChange={toggleCustomId} />
          <span className="c-tx-l2 f-s-sm2">Create custom ID</span>
        </div>
        <div>
          <input type="text" value={id} disabled={!useCustomId} onChange={(e) => setId(e.target.value)} />
        </div>
      </div>

      {requestStatus !== 'running' ? (
        <button type="button" disabled={!isValid} onClick={onCreatePost}>
          {'Create'}
        </button>
      ) : (
        <Spinner size={2} thickness={0.4} />
      )}
    </div>
  );
}
