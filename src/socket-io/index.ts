import * as Koa from 'koa';
import * as IO from 'koa-socket';

// just a quick fix to support vscode intellisense
// https://github.com/mattstyles/koa-socket
declare class IO {
  /** Attaches to a koa application */
  attach(srv: Koa, opts?: SocketIO.ServerOptions): void;

  /** Attaches a callback to an event */
  on (event: string, listener: (ctx: Koa.Context, data: any) => void): IO;

  /**
   * Removes a callback from an event.
   * If the event is omitted then it will remove all listeners from the instance.
   * If the callback is omitted then all callbacks for the supplied event will be removed.
   */
  off(event: string, Listener?: (ctx: Koa.Context, data: any) => void): IO;

  /** Sends a message to all connections */
  broadcast(event: string, data: any): void;
}

export function attachSocketIO(app: Koa) {
  const io = new IO();
  io.attach(app);

  io.on('connection', (ctx, data) => {
    console.log('API: connection received');
  });

  io.on('msg', (ctx, data) => {
    console.log('msg event fired with message: ', data);
    ctx.socket.emit('msg', 'received msg event on ' + new Date().toLocaleString());
  });

}