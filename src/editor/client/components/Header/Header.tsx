import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export function Header(): ReactElement {
  return (
    <header className="pd flex w bg bd">
      <div className="mg-r f-b">{'Blog Editor'}</div>
      <div className="mg-x">
        <Link to={'/'}>{'Home'}</Link>
      </div>
      <div className="mg-x">
        <Link to={'/new'}>{'New Post'}</Link>
      </div>
    </header>
  );
}
