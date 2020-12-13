import { generateBoundary } from '../../compiler/boundary';
import express from 'express';
import { getPostIndex } from './post-index';
import cors from 'cors';
import { promises as fs } from 'fs';
import { BlogFile, CreateBlogPostFields } from '@apptypes';
import { format, formatISO } from 'date-fns';
import { generateFileContent } from '../../compiler/compiler';
import { loadFile } from '../../compiler/loader';
import { v4 as uuid } from 'uuid';

const base_path = process.cwd();
const post_path = `${base_path}/posts`;

const app = express();
const port = 8081;

async function run() {
  await getPostIndex(post_path);
  app.listen(port, () => {
    console.log(process.cwd());
    console.log(`Blog dev server running on port ${port}`);
  });
}

app.use(express.json());
app.use(cors());

app.get('/', (rq, rs) => {
  rs.send({});
});

app.get('/boundary', (rq, rs) => {
  rs.send(generateBoundary());
});

app.get('/uuid', (rq, rs) => {
  rs.send(uuid());
});

app.get('/date', (rq, rs) => {
  rs.send(formatISO(new Date()));
});

app.get('/post/:id', async (rq, rs) => {
  console.log('Incoming request for', rq.params.id);

  try {
    const body = await loadFile(`${post_path}/${rq.params.id}.mbpd`);

    console.log('Outoging', body);
    return rs.status(200).send(body);
  } catch (exception) {
    return rs.status(404).send({
      code: 'missing',
      message: `Unable to find the post ${rq.params.id}`,
    });
  }
});

app.post('/post', async (rq, rs) => {
  console.log('Body', rq.body);
  const body = rq.body as CreateBlogPostFields;
  const path = `${post_path}/${body.id}.mbpd`;

  try {
    await fs.stat(path);

    rs.status(409).send({
      code: 'exists',
      message: 'A blog post with that ID already exists',
    });

    rs.end();

    return;
  } catch {
    // The error is good, meaning the file doesn't exist
  }

  const now = formatISO(new Date());

  const file: BlogFile = {
    id: body.id,
    boundary: generateBoundary(),
    meta: {
      title: body.title,
      author: 'James Hay',
      created: now,
      updated: now,
      tags: [],
    },
    sections: [],
  };

  const content = generateFileContent(file);

  await fs.writeFile(path, content);

  rs.status(200).send(file);

  rs.end();
});

app.get('/post-index/', async (rq, rs) => {
  const value = await getPostIndex(post_path);
  rs.send(value);
});

run();
