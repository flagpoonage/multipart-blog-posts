import { BlogFileSection } from '@apptypes';
import React from 'react';

type SectionActionHandler = (section: BlogFileSection) => void;
interface BlogSectionInputProps {
  section: BlogFileSection;
  onRemove: SectionActionHandler;
  onMoveUp: SectionActionHandler;
  onMoveDown: SectionActionHandler;
}

export function BlogSectionInputStatus({ section, onRemove, onMoveUp, onMoveDown }: BlogSectionInputProps) {
  return (
    <div>
      <button onClick={() => onRemove(section)}>{'Remove'}</button>
      <button onClick={() => onMoveUp(section)}>{'Move Up'}</button>
      <button onClick={() => onMoveDown(section)}>{'Move Down'}</button>
    </div>
  );
}

export function BlogSectionInput(props: BlogSectionInputProps) {
  const { section } = props;
  return (
    <div>
      <BlogSectionInputStatus {...props} />
      {section.id}
    </div>
  );
}
