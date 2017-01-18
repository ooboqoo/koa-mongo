import * as Koa from 'koa';
import * as config from 'config';

import middleware from './middlewares';
import routes from './routes';

const app = new Koa();

app.use(middleware());
app.use(routes());

app.listen(config.port, () => {
  console.info(`Listening to http://localhost:${config.port}`);
});
