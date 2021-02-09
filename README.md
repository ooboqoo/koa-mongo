# koa-mongo

Koa2 + MongoDB + TypeScript Playground


## Get Started

> Please make sure the MongoDB service is running before starting the app!

```bash
$ npm install
$ npm start
```


## Document

Please refer to the folder [doc](./doc) for more information.


## Deploy

For security reason, please put the secret information in _config/production.json_, i.e.

```js
{
  "dbUrl": "mongodb+srv://<user>:<password>@<cluster>.bqgte.mongodb.net/<dbname>?retryWrites=true&w=majority",
  "jwtSecret": "your-secret-word"
}
```

This file should be placed when deploying only, then run `NODE_ENV=production node dist/app.js`.


## Dependencies

* [config](https://github.com/lorenwest/node-config) - organizes hierarchical configurations for your app deployments

* [koa-jwt](https://github.com/koajs/jwt) - Koa middleware for validating JSON Web Tokens

### Body Parsing

* [koa-bodyparser](https://github.com/koajs/body-parser) - a body parser for Koa, based on co-body

* [koa-multer](https://github.com/koa-modules/multer) - handling multipart/form-data for Koa


## DevDependencies

* [nodemon](http://nodemon.io/) - Monitor for any changes in your node.js application and automatically restart the server - perfect for development
