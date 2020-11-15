import { BlogPostIndex } from '../../types';
import * as gen from '../../compiler/generators';

let postIndex: BlogPostIndex;
let indexPath: string;

export async function getPostIndex(postPath: string): Promise<BlogPostIndex> {
  if (!postIndex || postPath !== indexPath) {
    postIndex = await gen.getPostIndex(`${postPath}/*.post`);
  }

  return postIndex;
}
