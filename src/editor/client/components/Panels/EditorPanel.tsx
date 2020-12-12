import styles from './EditorPanel.module.css';

import React, { ReactElement } from 'react';

export function EditorPanel(): ReactElement {
  return (
    <div className="w-20 bd-r h of-h of-y">
      <div className="pd flex dir-y w-20">
        <h1>Post Editor</h1>
      </div>
    </div>
  );
}
