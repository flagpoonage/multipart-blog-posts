import React, { ReactElement, useEffect } from 'react';
import { getPostIndex } from '../../services/api';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NewPost } from '../../pages/NewPost';
import { PostEditor } from '../../pages/PostEditor';
import { PostIndex } from '../../pages/PostIndex';
import { Header } from '../Header/Header';
import styles from './Root.module.css';
import { classnames } from '../../../../utils/classnames';

export function Root(): ReactElement {
  useEffect(() => {
    getPostIndex();
  }, []);

  return (
    <main className={classnames(styles.root, 'bg w h flex dir-y')}>
      <BrowserRouter>
        <Header />
        <div className="grow of-y">
          <Switch>
            <Route path="/new" exact={true}>
              <NewPost />
            </Route>
            <Route path="/post/:id" exact={true}>
              <PostEditor />
            </Route>
            <Route path="/" exact={true}>
              <PostIndex />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </main>
  );
}
