import { Middleware } from 'koa';
import * as jwt from 'koa-jwt/lib';
import * as config from 'config';

export default (opts?): Middleware => {
  return jwt({
    secret: config.jwtSecret,
    key: 'jwtdata',
    getToken: (ctx, opts) => ctx.header.authorization
  }).unless({ path: [/^\/api/, /^\/$/, /^\/error/, /^\/token/] });
}
