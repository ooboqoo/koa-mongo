import { Server } from 'http'
import * as url from 'url'
import * as WebSocket from 'ws'

interface packet {
  t: string;
  d: any;
}

export default function attachWS (server: Server) {
  const wss = new WebSocket.Server({noServer: true})

  server.on('upgrade', (request, socket, head) => {
    const pathname = url.parse(request.url).pathname
    if (pathname === '/websocket') {
      wss.handleUpgrade(request, socket, head, (socket) => {
        wss.emit('connection', socket, request)
      })
    } else if (pathname !== '/socket.io/') {
      socket.destroy()
    }
  })
  
  wss.on('connection', (socket: WebSocket) => {
    console.log('[WebSocket] A user connected.')
    socket.on('message', (message: string) => {
      let req
      console.log('[WebSocket] Received: ', message)
      if (message[0] === '{') {
        try { req = JSON.parse(message) } catch (error) { }
      }
      if (typeof req === 'object' && req.t) {
        handleJsonCommunication(req)
      } else {
        socket.send(message)
      }
    })
    socket.on('close', () => console.log('[WebSocket] A user disconnected.'))
    socket.on('error', evt => console.log('[WebSocket] error: ', evt))

    function handleJsonCommunication (req: packet) {
      if (req.t === 'PING') {
        pingHandler(req)
      } else {
        socket.send(JSON.stringify(req))
      }
    }

    // used for network speed testing
    let baseDelay = Math.ceil(Math.random() * 1000) * 2
    let debug = false
    function pingHandler ({d}: packet) {
      if (d.debug !== undefined || d.delay !== undefined) {
        debug = d.debug
        if (d.delay !== undefined) { baseDelay = d.delay }
        d = d.d
      }
      const randomDelay = debug ? Math.ceil(Math.random() * 1000) * 5 : 0
      setTimeout(() => {
        if (socket.readyState === 1) { socket.send(`{"t": "PONG", "d": ${d}}`) }
      }, baseDelay + randomDelay)
    }
  })
}
