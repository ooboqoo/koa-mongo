import * as Koa from 'koa';
import * as config from 'config';

import middleware from './middlewares';
import routes from './routes';
import { connectDatabase } from './db';

const app = new Koa();

app.use(middleware());
app.use(routes());

(async() => {
  try {
    const info = await connectDatabase(config.dbUrl);
    console.log(`Connected to ${config.dbUrl}`);
  } catch (error) {
    console.error('Unable to connect to database', error);
  }

  try {
    await app.listen(config.port);
    console.info(`Listening to http://localhost:${config.port}`);
  } catch (error) {
    console.log(error);
  }
})();
