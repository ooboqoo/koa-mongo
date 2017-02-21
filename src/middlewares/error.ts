import { Middleware } from 'koa';

export default (opts?): Middleware => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      switch (e.status) {
        case 401:
          ctx.body = 'Please login first!';
          break;
        default:
          ctx.body = e.stack || e.message;
      }
    }
  };
}
