// Koa and its middlewares still using commonjs format, ES6 module format will throw error after typescript complilation.
const Koa = require('koa');
const config = require('config');
const logger = require('koa-logger');

import middleware from './middlewares';
import routes from './routes';

const app = new Koa();

app.use(logger());
app.use(middleware());
app.use(routes());

app.listen(config.port, () => {
  console.info(`Listening to http://localhost:${config.port}`);
});