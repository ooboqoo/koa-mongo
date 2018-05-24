import * as config from 'config'
import * as compose from 'koa-compose' // Compose the given middleware and return middleware.
import * as logger from 'koa-logger'
import * as cors from '@koa/cors'
import * as bodyParser from 'koa-bodyparser'
import * as serve from 'koa-static'

import handleErrors from './error'
import auth from './auth'
import delay from './delay'

export default function middleware () {
  return compose([
    logger(),
    handleErrors(),
    cors(),
    auth(),
    bodyParser(),
    serve('./src/views', {defer: true}),
    serve('./doc'),
    delay({ms: 50})
  ])
}
