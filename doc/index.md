# koa-mongo

https://github.com/ooboqoo/koa-mongo

Koa2 + Mongoose + TypeScript Playground

> __Useful Links__
>
> * https://github.com/koajs/koa/wiki
> * https://mongoosejs.com/docs/
> * https://socket.io/docs/

## Get Started

Please make sure the MongoDB service is running before start app!!

```
$ npm i
$ npm run tsc
$ npm start
```


## Topics

### Code Style

```bash
$ npm i -D standard typescript-eslint-parser eslint-plugin-typescript
```

_package.josn_ add:

```json
{
  "standard": {
    "parser": "typescript-eslint-parser",
    "plugins": ["typescript"]
  }
}
```

```bash
$ npx standard **/**/*.ts
```

### JWT Authentication

Change the secret key in _config/default.json_ or Set the environment variable when deploy.

```json
{"jwtSecret": "your-own-secret-words"}
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

Fetch static resource served form folder 'doc' and 'views' don't need authorization.

You can find the full api list with the path http://localhost:3300/api
