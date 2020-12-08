import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as multipart from 'connect-multiparty';
import * as bodyParser from 'body-parser';
import * as serveStatic from 'serve-static';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  // 跨域
  app.enableCors();
  // 解析文件流
  app.use(multipart());
  // 大小限制
  app.use(bodyParser.json({ 'limit': '6000kb' }));
  // 映射静态资源
  app.use('/image',serveStatic(path.join(__dirname,'./upload'), {
    maxAge: '1d', // 缓存最大时间
    extensions:['jpg', 'jpeg', 'png', 'gif'], //文件格式
  }))
  // 渲染html
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(4399);

}
bootstrap();
