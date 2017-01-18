import { Context } from 'koa';

export default (router) => {
  router
    .get('/', (ctx: Context) => ctx.body = {hello: 'world'} )
    .get('/error', async () => {
      throw Error('Error handling works!');
    })
    .get('/301', (ctx: Context) => { ctx.status = 301; });
};
