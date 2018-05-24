import { Middleware, Context } from 'koa'
import * as jwt from 'koa-jwt'
import * as config from 'config'

export default (opts?): Middleware => {
  return jwt({
    secret: process.env.jwtSecret || config.get<string>('jwtSecret'),
    getToken: (ctx: any) => ctx.header.authorization
  }).unless({ path: [
    /^\/[^/]*\/?$/,
    /\/views/,
    /\/socket.io/,
    /test\/(?!auth)/
  ]})
}
