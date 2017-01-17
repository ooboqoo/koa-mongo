export default (router) => {
  router
    .get('/user/me', async ctx => {
      const user = await Promise.resolve('myname');
      if (user) ctx.body = user;
    })

};
