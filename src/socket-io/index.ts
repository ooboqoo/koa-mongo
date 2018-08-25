import * as Koa from 'koa'
import * as IO from 'koa-socket-2'

export default function attachSocketIO (app: Koa) {
  const io = new IO()

  io.attach(app)

  io.on('connection', (ctx, data) => {
    console.log('[WebSocket] a user connected')
  })

  io.on('msg', (ctx, data) => {
    console.log('[WebSocket] received "msg" with message: ', data)
    ctx.socket.emit('msg', 'received "msg" event on ' + new Date().toLocaleString())
  })

  // used for network speed testing ===========================
  let baseDelay = Math.ceil(Math.random() * 1000) * 2
  let debug = false
  // use the upper case of original `ping` and `pong` to prevent the default behavior
  io.on('PING', (ctx, id) => {
    if (id.delay !== undefined) { baseDelay = id.delay; debug = id.debug; id = id.id }
    const randomDelay = debug ? Math.ceil(Math.random() * 1000) * 5 : 0
    setTimeout(() => ctx.socket.emit('PONG', id), baseDelay + randomDelay)
  })
}
