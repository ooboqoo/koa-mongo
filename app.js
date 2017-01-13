const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const config = require('config');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
router.get('/', (ctx) => ctx.body = {hello: 'world'});
app.use(router.routes());

app.listen(config.port, () => {
  console.info(`Listening to http://localhost:${config.port}`);
});
