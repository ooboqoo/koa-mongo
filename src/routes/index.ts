import * as compose from 'koa-compose'
import * as Router from 'koa-router'
import { Context } from 'koa'

import test from './test'
import file from './file'
import user from './api/user'

const children = [
  {routes: test, prefix: ''},
  {routes: file, prefix: ''},
  {routes: user, prefix: '/api'}
]

export default function routes () {
  const router = new Router()

  router
    .get('/api', (ctx: Context) => {
      ctx.body = router.stack.map(i => i.path)
    })

  // Nested routers
  children.forEach(child => {
    const nestedRouter = new Router()
    child.routes(nestedRouter)
    router.use(child.prefix, nestedRouter.routes(), nestedRouter.allowedMethods())
  })

  return compose([router.routes(), router.allowedMethods()])
}
