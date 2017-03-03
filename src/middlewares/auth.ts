import { Middleware, Context } from 'koa';
import * as jwt from 'koa-jwt/lib';
import * as config from 'config';

export default (opts?): Middleware => {
  return jwt({
    secret: config.get<string>('jwtSecret'),
    key: 'jwtdata',
    getToken: (ctx, opts) => ctx.header.authorization
  }).unless({ path: [/^\/[^/]*$/, /^\/error/, /^\/token/] });
}
