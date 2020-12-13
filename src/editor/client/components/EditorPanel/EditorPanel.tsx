import React, { ChangeEvent, ReactElement } from 'react';
import { TextInputField } from '@editor-components/FormField/InputField';
import { BlogFile } from '@apptypes';

interface EditorPanelProps {
  post: BlogFile | undefined;
  onChange: (v: BlogFile) => void;
}

export function EditorPanel({ post, onChange }: EditorPanelProps): ReactElement {
  const onSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (!post) {
      return;
    }

    onChange({
      ...post,
      meta: {
        ...post.meta,
        title: e.target.value,
      },
    });
  };

  return (
    <div className="w-20 bd-r h of-h of-y">
      <div className="pd-x flex dir-y w-20">
        <TextInputField
          className="w"
          name="title"
          title="Post Title"
          value={post?.meta.title || ''}
          onChange={onSetTitle}
        />
      </div>
    </div>
  );
}
