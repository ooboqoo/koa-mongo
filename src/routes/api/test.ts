import { Context } from 'koa';
import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

export default (router: Router) => {
  router
    .get('/', (ctx: Context) => console.log('should not work') )
    .get('/error', async () => {
      throw Error('Error handling works!');
    })
    .post('/token', async (ctx: Router.IRouterContext) => {
      const key = config.get<string>('jwtSecret');
      ctx.body = { token: jwt.sign({ username: ctx.request.body.username }, key)};
    })
    .get('/auth', (ctx: Context) => ctx.body = `Welcome ${ctx.state.jwtdata.username}`)
    .get('/301', (ctx: Context) => { ctx.status = 301; });
};
