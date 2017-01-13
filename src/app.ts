const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const config = require('config');
const handleErrors = require('./middlewares/handle-errors');

const app = new Koa();
const router = new Router();

app.use(handleErrors);
app.use(bodyParser());

router.get('/', (ctx) => ctx.body = {hello: 'world'});
router.get('/error/test', async () => {
  throw Error('Error handling works!');
});

app.use(router.routes());

app.listen(config.port, () => {
  console.info(`Listening to http://localhost:${config.port}`);
});
