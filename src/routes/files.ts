import * as Router from 'koa-router';
import * as config from 'config';
import * as multer from 'koa-multer';
import * as http from 'http';


const upload = multer({ dest: 'uploads/' });

interface IncomingMessage extends http.IncomingMessage {
  file: any;
  files: any[];
}

interface IMulterContext extends Router.IRouterContext {
  req: IncomingMessage;
}

export default (router: Router) => {
  router
    .post('/profile', upload.single('avatar'), async (ctx: IMulterContext) => {
      //originalname 文件名称，path上传后文件的临时路径，mimetype文件类型
      const path = ctx.req.file.path;
      //之后可以对文件进行上出上传到七牛等操作，完成操作后
      ctx.body = path;
    })
    .post('/photos/upload', upload.array('photos', 12));
};
