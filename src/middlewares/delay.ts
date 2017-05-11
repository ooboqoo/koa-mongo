import {Middleware} from 'koa';
import {sleep} from '../utils';

/**
 * Sleep specific millseconds before response.
 * Usage: http://example.com/delaytest.js?sleep=500
 */
export default (opts?): Middleware => {
  return async (ctx, next) => {
    const delay = Number.parseInt(ctx.query.sleep) || opts.ms || 2000;
    await sleep(delay);
    await next();
  };
}
