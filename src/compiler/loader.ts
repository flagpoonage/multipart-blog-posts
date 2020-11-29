import { BlogFile, BlogFileRaw } from '@apptypes';
import { readFile } from 'fs';
import { basename } from 'path';
import { parseContent } from './parser';
import globby from 'globby';

export async function loadFile(filePath: string): Promise<BlogFile> {
  const file = await loadFileRaw(filePath);

  const [content, boundary] = parseContent(file.content.toString('utf-8'));

  return {
    id: file.id,
    boundary,
    ...content,
  };
}

export async function loadFileRaw(filePath: string): Promise<BlogFileRaw> {
  const filename = basename(filePath);
  return await new Promise<BlogFileRaw>((rs, rj) =>
    readFile(filePath, (err, data) =>
      err
        ? rj(err)
        : rs({
            id: filename.split('.').shift() || filename,
            content: data,
          })
    )
  );
}

export async function loadFilesFromGlob(glob: string): Promise<BlogFile[]> {
  const files = await globby(glob);
  return Promise.all(files.map(async (file) => await loadFile(file)));
}

export async function loadFilesRawFromGlob(glob: string): Promise<BlogFileRaw[]> {
  const files = await globby(glob);
  return Promise.all(files.map(async (file) => await loadFileRaw(file)));
}
