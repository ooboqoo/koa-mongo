import { Server } from 'http'
import IO, { Socket } from 'socket.io'

export default function attachSocketIO (server: Server) {
  const io = new IO.Server(server)

  io.on('connection', (socket) => {
    console.log('[Socket.IO] A user connected.')
    addMsgHandler(socket)
    addPingHandler(socket)
  })

  function addMsgHandler (socket: Socket) {
    socket.on('msg', (msg) => {
      console.log('[Socket.IO] Received: ', msg)
      socket.emit('msg', msg)
    })
  }

  // used for network speed testing
  function addPingHandler (socket: Socket) {
    let baseDelay = Math.ceil(Math.random() * 1000) * 2
    let debug = false
    // use the upper case of original `ping` and `pong` to prevent the default behavior
    socket.on('PING', (id) => {
      if (id.delay !== undefined) { baseDelay = id.delay; debug = id.debug; id = id.id }
      const randomDelay = debug ? Math.ceil(Math.random() * 1000) * 5 : 0
      setTimeout(() => socket.emit('PONG', id), baseDelay + randomDelay)
    })
  }
}
