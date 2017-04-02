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
  const displayColor = config.get('logColor');
  try {
    const dbUrl = config.get<string>('dbUrl');
    const info = await connectDatabase(dbUrl);
    console.info(displayColor ? '\x1b[32m%s\x1b[0m' : '%s', `Connected to ${dbUrl}`);
  } catch (error) {
    console.error(displayColor ? '\x1b[31m%s\x1b[0m' : '%s', error.toString());
  }

  try {
    const port = config.get<string>('port');
    await app.listen(port);
    console.info(displayColor ? '\x1b[32m%s\x1b[0m' : '%s', `Listening to http://localhost:${port}`);
  } catch (error) {
    console.error(displayColor ? '\x1b[31m%s\x1b[0m' : '%s', error);
  }
})();
