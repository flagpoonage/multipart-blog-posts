import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NewPost } from './NewPost';
import { PostEditor } from './PostEditor';
import { PostIndex } from './PostIndex';
import { Header } from '@editor-components/Header/Header';

export function Root(): ReactElement {
  return (
    <main className="bg w h flex dir-y">
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
