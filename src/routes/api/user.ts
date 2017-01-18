import { Context } from 'koa';

export default (router) => {
  router
    .get('/user/me', async (ctx: Context) => {
      const user = await Promise.resolve('myname');
      if (user) ctx.body = user;
    })

};
