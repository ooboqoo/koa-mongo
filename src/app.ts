import * as Koa from 'koa';
import * as config from 'config';

import middleware from './middlewares';
import routes from './routes';
import { connectDatabase } from './databases';

const app = new Koa();

app.use(middleware());
app.use(routes());

(async() => {
  try {
    const dbUrl = config.get<string>('dbUrl');
    const info = await connectDatabase(dbUrl);
    console.log(`Connected to ${dbUrl}`);
  } catch (error) {
    console.error('Unable to connect to database', error);
  }

  try {
    const port = config.get<string>('port');
    await app.listen(port);
    console.info(`Listening to http://localhost:${port}`);
  } catch (error) {
    console.log(error);
  }
})();
