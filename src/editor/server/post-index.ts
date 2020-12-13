import { BlogPostIndex } from '@apptypes';
import * as gen from '../../compiler/generators';

export async function getPostIndex(postPath: string): Promise<BlogPostIndex> {
  return await gen.getPostIndex(`${postPath}/*.mbpd`);
}
