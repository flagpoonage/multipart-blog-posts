import React, { useState } from 'react';
import { Spinner } from '../components/Spinner/Spinner';

export function generateIdFromTitle(title: string) {
  const parts = title.split(' ').filter((a) => !!a);

  return parts
    .map((a) => {
      return a.replaceAll(/[^A-Za-z0-9-]/g, '').toLowerCase();
    })
    .join('-');
}

export function NewPost() {
  const [useCustomId, setUseCustomId] = useState(false);
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');

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
      <button type="button" onClick={() => console.log('Click')}>
        {'Create'}
      </button>
    </div>
  );
}
