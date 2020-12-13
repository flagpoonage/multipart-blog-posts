import { PostPreview } from '@editor-components/PostPreview/PostPreview';
import React from 'react';
import { render } from 'react-dom';
import '../../../site/index.css';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  root.id = 'preview-container';
  root.innerHTML = 'Hello!';
  document.body.appendChild(root);

  render(<PostPreview />, root);
});
