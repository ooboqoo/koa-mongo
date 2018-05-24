# Demo 

## Useful Links

* https://github.com/koajs/koa/wiki
* http://mongoosejs.com/docs/


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

Change the secret key in _config/default.json_

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

### Socket.io




