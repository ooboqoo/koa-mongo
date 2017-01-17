const compose = require('koa-compose');
const Router = require('koa-router');

const routerConfigs = [
  { file: 'base/test', prefix: '' },
  { file: 'api/user', prefix: '/api' }
];

export default function routes() {
  // const composed = routerConfigs.reduce((prev, curr) => {
  //   const routes = require('./' + curr.file);
  //   const router = new Router({ prefix: curr.prefix });

  //   Object.keys(routes).map(name => routes[name](router));

  //   return [router.routes(), router.allowedMethods(), ...prev];
  // }, []);

  // return compose(composed);

  const router = new Router();

  router
    .get('/', (ctx) => ctx.body = {hello: 'world'} )
    .get('/error', async () => {
      throw Error('Error handling works!');
    });

  return router.routes;
}