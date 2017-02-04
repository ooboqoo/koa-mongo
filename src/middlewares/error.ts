import { Middleware } from 'koa';

export default (opts?): Middleware => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      switch (e.status) {
        case 401:
          ctx.body = {code: 401, message: e.message};
          break;
        default:
          ctx.body = {
            code: e.status || 500,
            message: e.message,
            errors: e.errors,
            stack: e.stack
          };
      }
    }
  };
}
