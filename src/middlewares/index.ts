const compose = require('koa-compose');  // Compose the given middleware and return middleware.
const convert = require('koa-convert');  // convert koa legacy generator middleware to promise middleware ( v2.x )
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');

import handleErrors from './handle-errors';

export default function middleware() {
  return compose([
    handleErrors(),
    convert(cors()),
    bodyParser(),
  ]);
}
