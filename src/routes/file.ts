import * as Router from 'koa-router'
import * as config from 'config'
import * as multer from 'koa-multer'
import * as http from 'http'
import * as fs from 'fs'

const dest = config.get<string>('uploadDir')

const upload = multer({dest})

interface IncomingMessage extends http.IncomingMessage {
  file: { originalname: string; path: string; mimetype: string; };
  files: any[];
}

interface IMulterContext extends Router.IRouterContext {
  req: IncomingMessage;
}

export default (router: Router) => {
  router
    .post('/profile/upload', upload.single('avatar'), async (ctx: IMulterContext) => { // 'avatar' is the 'name' value of form field
      const {originalname, path} = ctx.req.file
      fs.rename(path, dest + originalname, null)
      ctx.body = {originalname, path}
    })
    .post('/photos/upload', upload.array('photos', 12))
}
