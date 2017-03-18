import * as Koa from 'koa';
import * as config from 'config';
import { attachSocketIO } from './socket-io';

import middleware from './middlewares';
import routes from './routes';
import { connectDatabase } from './databases';

const app = new Koa();

app.use(middleware());
app.use(routes());

attachSocketIO(app);

(async () => {
  try {
    const dbUrl = config.get<string>('dbUrl');
    const info = await connectDatabase(dbUrl);
    console.info('\x1b[32m%s\x1b[0m', `Connected to ${dbUrl}`);
  } catch (error) {
    console.error('\x1b[31m%s\n%s\x1b[0m', 'Unable to connect to database.', error);
  }

  try {
    const port = config.get<string>('port');
    await app.listen(port);
    console.info('\x1b[32m%s\x1b[0m', `Listening to http://localhost:${port}`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', error);
  }
})();
