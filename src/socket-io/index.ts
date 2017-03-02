import * as Koa from 'koa';
import * as IO from 'koa-socket';

export function setSocket(app: Koa) {
  const io = new IO();
  io.attach(app);

  io.on('msg', (ctx, data) => {
    console.log('msg event fired', data);
    ctx.socket.emit('msg', 'received msg event on ' + new Date().toLocaleString());
  });

  io.on('connection', (ctx, data) => {
    console.log('API: connection received');
  });

}