import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import config from 'config'

import { sleep } from '../utils'

export default (router: Router) => {
  router
    .post('/test/token', async ctx => {
      const key = process.env.jwtSecret || config.get<string>('jwtSecret')
      ctx.body = {token: jwt.sign({username: <string>ctx.request.body.username}, key)}
    })
    .get('/test/auth', ctx => ctx.body = `Welcome ${ctx.state.user.username}!`)
    .get('/test/error', async () => { throw Error('Error handling works!') })
    .get('/test/400', ctx => {
      ctx.status = 400, ctx.body = {status: {code: 1003, message: 'something went wrong'}}
    })
    .get('/test/301', ctx => { ctx.status = 301 })
    .get('/test/timeout', async ctx => { await sleep(1000 * 50) })
}
