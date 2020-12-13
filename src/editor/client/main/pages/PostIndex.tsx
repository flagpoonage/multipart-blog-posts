import React, { ReactElement, useCallback } from 'react';
import { useApiCall } from '@hooks/use-api-call';
import { PostIndexList } from '@editor-components/PostIndexList/PostIndexList';
import { Spinner } from '@editor-components/Spinner/Spinner';
import { getPostIndex } from '@api';

export function PostIndex(): ReactElement {
  const apiCall = useCallback(() => getPostIndex(), []);
  const callStatus = useApiCall(apiCall);

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
