import { getPostContent } from '@api';
import { EditorStatus } from '@editor-components/EditorStatus/EditorStatus';
import { DisplayPanel } from '@editor-components/Panels/DisplayPanel';
import { EditorPanel } from '@editor-components/Panels/EditorPanel';
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';

export function PostEditor() {
  const location = useParams<{ id: string }>();
  // const path = location.pathname.split('/').pop();

  // console.log(location, props);
  useEffect(() => {
    getPostContent(location.id);
  });

  return (
    <div className="h of-h flex dir-y">
      <EditorStatus />
      <div className="grow flex">
        <EditorPanel />
        <DisplayPanel />
      </div>
    </div>
  );
}
