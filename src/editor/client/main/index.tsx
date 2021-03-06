import './index.css';
import React from 'react';
import { render } from 'react-dom';
import { Root } from '@editor-pages/Root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  root.id = 'react-container';
  document.body.appendChild(root);

  render(<Root />, root);
});
