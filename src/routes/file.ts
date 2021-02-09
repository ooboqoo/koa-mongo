import Router from 'koa-router'
import config from 'config'
import multer from 'koa-multer'
import http from 'http'
import fs from 'fs'

const dest = config.get<string>('uploadDir')

const upload = multer({ dest })

interface IncomingMessage extends http.IncomingMessage {
  file: { originalname: string, path: string, mimetype: string }
  files: any[]
}

interface IMulterContext extends Router.IRouterContext {
  req: IncomingMessage
}

export default (router: Router) => {
  router
    .post('/profile/upload', upload.single('avatar'), async (ctx: IMulterContext) => { // 'avatar' is the 'name' value of form field
      const { originalname, path } = ctx.req.file
      fs.rename(path, dest + originalname, () => {})
      ctx.body = { originalname, path }
    })
    .post('/photos/upload', upload.array('photos', 12))
}
