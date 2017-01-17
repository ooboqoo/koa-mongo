export default (router) => {
  router
    .get('/', (ctx) => ctx.body = {hello: 'world'} )
    .get('/error', async () => {
      throw Error('Error handling works!');
    })
    .get('/301', (ctx) => { ctx.status = 301; });
};