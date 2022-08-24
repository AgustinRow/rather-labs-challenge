import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

const port = 3000;

export const start = () => {
  app.listen(port, () => {
    console.log(`REST API on http://localhost:${port}`);
  });
};
