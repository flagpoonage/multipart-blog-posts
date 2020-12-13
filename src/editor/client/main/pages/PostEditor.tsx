import { getPostContent } from '@api';
import { BlogFile } from '@apptypes';
import { EditorStatus } from '@editor-components/EditorStatus/EditorStatus';
import { DisplayPanel } from '@editor-components/DisplayPanel/DisplayPanel';
import { EditorPanel } from '@editor-components/EditorPanel/EditorPanel';
import { useApiCall } from '@hooks/use-api-call';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

interface PostEditorRouteParams {
  id: string;
}

export function PostEditor(): ReactElement {
  const location = useParams<PostEditorRouteParams>();

  const apiCall = useCallback(() => getPostContent(location.id), [location.id]);
  const [apiBlogPost, status] = useApiCall(apiCall);
  const [blogPost, setBlogPost] = useState<BlogFile>();

  useEffect(() => {
    setBlogPost(apiBlogPost);
  }, [apiBlogPost]);

  return (
    <div className="h of-h flex dir-y">
      <EditorStatus status={status} post={blogPost} />
      <div className="grow flex">
        <EditorPanel post={blogPost} onChange={(post: BlogFile) => setBlogPost(post)} />
        <DisplayPanel post={blogPost} />
      </div>
    </div>
  );
}
