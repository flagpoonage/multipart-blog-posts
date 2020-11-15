import './index.css';
import React from 'react';
import { render } from 'react-dom';
import { Root } from './pages/Root/Root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  render(<Root />, root);
});
