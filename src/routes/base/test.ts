export default (router) => {
  router
    .get('/', (ctx) => ctx.body = {hello: 'world'} )
    .get('/error', async () => {
      throw Error('Error handling works!');
    });
};