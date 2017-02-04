import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import { Context } from 'koa';

import test from './test';
import user from './api/user';

const children = [
  { routes: test, prefix: '' },
  { routes: user, prefix: '/api' }
];

export default function routes() {
  const router = new Router();

  router
    .get('/', (ctx: Context) => ctx.body = {echo: 'Hello World!'});

  // Nested routers
  children.forEach(child => {
    const nestedRouter = new Router();
    child.routes(nestedRouter);
    router.use(child.prefix, nestedRouter.routes(), nestedRouter.allowedMethods());
  });

  return compose([router.routes(), router.allowedMethods()]);
}
