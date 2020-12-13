import { BlogFileSection } from '@apptypes';
import React from 'react';

interface BlogSectionInputProps {
  section: BlogFileSection;
  onRemove: (section: BlogFileSection) => void;
}

export function BlogSectionInputStatus ({ section }) {

}

export function BlogSectionInput({ section }: BlogSectionInputProps) {
  return <div className="bd w">
    <div
    {section.content}</div>;
}
