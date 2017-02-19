import * as Router from 'koa-router';
import * as config from 'config';
import * as multer from 'koa-multer';
import * as http from 'http';
import * as fs from 'fs';

const dest = config.get('files');

const upload = multer({ dest: dest });

interface IncomingMessage extends http.IncomingMessage {
  file: { originalname: string; path: string; mimetype: string; };
  files: any[];
}

interface IMulterContext extends Router.IRouterContext {
  req: IncomingMessage;
}

export default (router: Router) => {
  router
    .post('/profile', upload.single('avatar'), async (ctx: IMulterContext) => {  // avatar 为 form 的字段名
      const { originalname, path } = ctx.req.file;
      fs.rename(path, dest + originalname);
      ctx.body = { originalname, path };
      ctx.status = 200;
    })
    .post('/photos/upload', upload.array('photos', 12));
};
