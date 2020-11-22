import React, { useEffect, useState } from 'react';
import { BlogPostIndex } from 'src/types';
import { useApiCall } from '../../../utils/hooks';
import { PostIndexList } from '../components/PostIndexList/PostIndexList';
import { Spinner } from '../components/Spinner/Spinner';
import { getPostIndex } from '../services/api';

export function PostIndex() {
  const callStatus = useApiCall(() => getPostIndex());

  return (
    <div className="pd">
      <h1>{'Current Posts'}</h1>
      {callStatus[1] === 'complete' && <PostIndexList index={callStatus[0]} />}
      {callStatus[1] === 'running' && (
        <div className="pd-y">
          <Spinner size={2} thickness={0.4} />
        </div>
      )}
      {callStatus[1] === 'error' && callStatus[2]}
    </div>
  );
}
