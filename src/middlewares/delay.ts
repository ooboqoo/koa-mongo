import {Middleware} from 'koa';
import {sleep} from '../utils';

export default (opts?): Middleware => {
  return async (ctx, next) => {
    let delay = opts.ms || 2000;
    if (/js1/.test(ctx.url)) {
      delay = 8000;
    }
    await sleep(delay);
    await next();
  };
}
