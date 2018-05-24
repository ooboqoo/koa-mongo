import * as Koa from 'koa'
import * as IO from 'koa-socket-2'

export function attachSocketIO (app: Koa) {
  const io = new IO()

  io.attach(app)

  io.on('connection', (ctx, data) => {
    console.log('API: connection received')
  })

  io.on('msg', (ctx, data) => {
    console.log('msg event fired with message: ', data)
    ctx.socket.emit('msg', 'received msg event on ' + new Date().toLocaleString())
  })
}
