import { ApiCallStatus, BlogFile } from '@apptypes';
import React, { ReactElement } from 'react';

interface EditorStatusProps {
  status: ApiCallStatus;
  post: BlogFile | undefined;
}

export function EditorStatus({ status, post }: EditorStatusProps): ReactElement {
  return (
    <div className="h-2 f-b c-bg-p c-tx-bg noflex bd-b flex dir-y pd-x" style={{ justifyContent: 'center' }}>
      {`Editing:  ${post ? post.meta.title : status.toUpperCase()}`}
    </div>
  );
}
