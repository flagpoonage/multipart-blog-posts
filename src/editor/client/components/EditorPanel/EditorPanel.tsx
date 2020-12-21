import React, { ChangeEvent, ReactElement } from 'react';
import { TextInputField } from '@editor-components/FormField/InputField';
import { BlogFile, BlogFileSection } from '@apptypes';
import { BlogSectionInput } from '@editor-components/BlogSectionInput/BlogSectionInput';
import { Spinner } from '@editor-components/Spinner/Spinner';
import { v4 as uuid } from 'uuid';
interface EditorProps {
  post: BlogFile;
  onChange: (v: BlogFile) => void;
}

export function Editor({ post, onChange }: EditorProps): ReactElement {
  const onSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...post,
      meta: {
        ...post.meta,
        title: e.target.value,
      },
    });
  };

  const onAddSection = (type: string) => {
    const sections = [
      ...post.sections,
      {
        id: uuid(),
        tag: type,
        content: '',
      },
    ];

    onChange({
      ...post,
      sections,
    });
  };

  const onRemoveSection = (section: BlogFileSection) => {
    const sections = [...post.sections];
    const sectionIndex = sections.findIndex((a) => a.id === section.id);

    sections.splice(sectionIndex, 1);

    onChange({
      ...post,
      sections,
    });
  };

  const onMoveUpSection = (section: BlogFileSection) => {
    const sections = [...post.sections];
    const sectionIndex = sections.findIndex((a) => a.id === section.id);

    if (sectionIndex < 1) {
      return;
    }

    const prevIndex = sectionIndex - 1;
    const prevSection = sections[prevIndex];

    sections.splice(prevIndex, 2, section, prevSection);

    onChange({
      ...post,
      sections,
    });
  };

  const onMoveDownSection = (section: BlogFileSection) => {
    const sections = [...post.sections];
    const sectionIndex = sections.findIndex((a) => a.id === section.id);

    if (sectionIndex >= sections.length - 1) {
      return;
    }

    const nextIndex = sectionIndex + 1;
    const nextSection = sections[nextIndex];

    sections.splice(sectionIndex, 2, nextSection, section);

    onChange({
      ...post,
      sections,
    });
  };

  return (
    <div className="pd-x">
      <TextInputField
        className="w"
        name="title"
        title="Post Title"
        value={post?.meta.title || ''}
        onChange={onSetTitle}
      />
      {post.sections.map((a) => (
        <BlogSectionInput
          key={a.id}
          section={a}
          onRemove={onRemoveSection}
          onMoveUp={onMoveUpSection}
          onMoveDown={onMoveDownSection}
        />
      ))}
      <div className="mg-y">
        <button className="bd-0 pd-0 c-bg-trns c-tx-p cur-p hv-ul" onClick={() => onAddSection('markdown')}>
          {'Add Markdown Section'}
        </button>
      </div>
    </div>
  );
}
interface EditorPanelProps {
  post: BlogFile | undefined;
  onChange: (v: BlogFile) => void;
}

export function EditorPanel({ post, onChange }: EditorPanelProps): ReactElement {
  return (
    <div className="w-20 bd-r h of-h of-y">
      {post ? (
        <Editor post={post} onChange={onChange} />
      ) : (
        <div className="pd-x">
          <Spinner />
        </div>
      )}
    </div>
  );
}
