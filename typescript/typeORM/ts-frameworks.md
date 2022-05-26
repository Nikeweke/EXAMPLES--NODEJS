# Typescript API frameworks

### Express

```ts
// npm i @types/express @types/node typescript -D
// npm i express -S
import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
```

### TypeORM

```sh
# get ready template (express+mysql)
npx typeorm init --name MyProject --database mysql --express
```