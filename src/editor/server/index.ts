import { generateBoundary } from '../../compiler/boundary';
import express from 'express';
import { getPostIndex } from './post-index';
import cors from 'cors';

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

app.use(cors());

app.get('/', (rq, rs) => {
  rs.send({});
});

app.get('/boundary', (rq, rs) => {
  rs.send(generateBoundary());
});

app.get('/post-index/', async (rq, rs) => {
  const value = await getPostIndex(post_path);
  rs.send(value);
});

run();
