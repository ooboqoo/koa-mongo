import { Middleware } from 'koa';

export default (opts?): Middleware => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      const resError = {
        code: 500,
        message: e.message,
        errors: e.errors
      };
      if (e instanceof Error) {
        Object.assign(resError, {stack: e.stack});
      }
      Object.assign(ctx, {body: resError, status: e.status || 500});
    }
  };
}
