import './index.css';
import React from 'react';
import { render } from 'react-dom';
import { Example } from './components/test';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  render(<Example />, root);
});
