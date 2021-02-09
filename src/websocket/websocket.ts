import { Server } from 'http'
import url from 'url'
import WebSocket from 'ws'

interface packet {
  t: string
  d: any
}

export default function attachWS (server: Server) {
  const wss = new WebSocket.Server({ noServer: true })

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

    setInterval(() => {
      socket.ping(() => {
        console.log('sent ping event')
      })
    }, 5000)

    socket.on('pong', () => {
      console.log('received pong event')
    })

    socket.on('message', (message: string) => {
      let req
      console.log('[WebSocket] Received: ', message)
      if (message[0] === '{') {
        try { req = JSON.parse(message) } catch (error) { }
      }
      if (typeof req === 'object' && req.t) {
        handleJsonCommunication(req)
      } else if (message === 'PING') {
        // There is no browser API to send ping frames or receive pong frames,
        // here we implement a high level ping/pong API.
        // https://stackoverflow.com/questions/10585355/sending-websocket-ping-pong-frame-from-browser
        socket.send('PONG')
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
    function pingHandler ({ d }: packet) {
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
