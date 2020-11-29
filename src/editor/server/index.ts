import { generateBoundary } from '../../compiler/boundary';
import express from 'express';
import { getPostIndex } from './post-index';
import cors from 'cors';
import { promises as fs } from 'fs';
import { BlogFile, CreateBlogPostFields } from '@apptypes';
import { format } from 'date-fns';
import { generateFileContent } from '../../compiler/compiler';

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

app.post('/post', async (rq, rs) => {
  console.log('Body', rq.body);
  const body = rq.body as CreateBlogPostFields;
  const path = `${post_path}/${body.id}.post`;

  try {
    const exists = await fs.stat(path);

    rs.status(409).send({
      code: 'exists',
      message: 'A blog post with that ID already exists',
    });

    rs.end();

    return;
  } catch {
    // The error is good, meaning the file doesn't exist
  }

  const now = format(new Date(), 'yyyy-MM-dd');

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
