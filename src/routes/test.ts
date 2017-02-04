import { Context } from 'koa';
import * as Router from 'koa-router';

export default (router: Router) => {
  router
    .get('/', (ctx: Context) => console.log('should not work') )
    .get('/error', async () => {
      throw Error('Error handling works!');
    })
    .get('/301', (ctx: Context) => { ctx.status = 301; });
};
