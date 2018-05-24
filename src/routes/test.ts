import { Context } from 'koa'
import * as Router from 'koa-router'
import * as jwt from 'jsonwebtoken'
import * as config from 'config'

export default (router: Router) => {
  router
    .get('/', (ctx: Context) => console.log('should not work'))
    .get('/test/error', async () => { throw Error('Error handling works!') })
    .post('/test/token', async (ctx: Router.IRouterContext) => {
      const key = process.env.jwtSecret || config.get<string>('jwtSecret')
      ctx.body = {token: jwt.sign({username: <string>ctx.request.body.username}, key)}
    })
    .get('/test/auth', (ctx: Context) => ctx.body = `Welcome ${ctx.state.user.username}!`)
    .get('/test/301', (ctx: Context) => { ctx.status = 301 })
}
