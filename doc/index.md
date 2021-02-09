# koa-mongo

https://github.com/ooboqoo/koa-mongo

Koa2 + Mongoose + TypeScript Playground

> __Useful Links__
>
> * https://github.com/koajs/koa/wiki
> * https://mongoosejs.com/docs/
> * https://socket.io/docs/

## Get Started

Please make sure the MongoDB service is running before starting the app!!

```
$ npm install
$ npm start
```


## Topics

### Code Style

https://github.com/standard/eslint-config-standard-with-typescript


### JWT Authentication

Change the secret key in _config/production.json_ or Set the environment variable when deploy.

```json
{
  "jwtSecret": "your-own-secret-words"
}
```

The downstream middleware can access the auth info from `ctx.state.user`.

Client test:

```bash
# fetch the token
$ curl http://localhost:3300/test/token -H "Content-Type: application/json" -X POST -d "{\"username\": \"gavin\"}"
# test the authentication
$ curl http://localhost:3300/test/auth -H "Authorization: <fill in your token here>"
```

### WebSocket

Test Socket.IO: http://localhost:3300/socket-io.html
Test WebSocket: http://localhost:3300/websocket.html

### Others

Fetching static resources served from the folder _doc_ and _views_ does not require any authorization.

You can find the full API list with the path: http://localhost:3300/api.
Especially, the http://localhost:300/echo is fantastic for debugging.
