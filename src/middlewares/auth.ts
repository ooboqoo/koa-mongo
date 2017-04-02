import { Middleware, Context } from 'koa';
import * as jwt from 'koa-jwt/lib';
import * as config from 'config';

export default (opts?): Middleware => {
  return jwt({
    secret: process.env.jwtSecret || config.get<string>('jwtSecret'),
    key: 'jwtdata',
    getToken: (ctx, opts) => ctx.header.authorization
  }).unless({ path: [/^\/[^/]*\/?$/, /test\/(?!auth)/] });
}
