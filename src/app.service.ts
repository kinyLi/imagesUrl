import { Injectable } from '@nestjs/common';
import { AppDto } from './app.dto';
import * as fs from 'fs';
import * as path from 'path';
import host from './getHost';


@Injectable()
export class AppService {

  async setImage( appDto: AppDto ) {
    const { files: { file } } = appDto;
    const data = await fs.readFileSync(file.path);
    if(!data || !file.name) {
      return {
        msg: 'fail, file is undefined',
      };
    }

    const uploadPath = path.join(__dirname, 'upload');
    if(!fs.existsSync(uploadPath)) {
        try {
          await fs.mkdirSync(uploadPath);
        } catch (err) {
          console.log(err);
        }
    }
    const date = new Date().getTime().toString().substring(0 ,10);
    const extName = path.extname(file.name);
    const dataName = date + extName;
    const dataPath = await path.join(uploadPath, dataName);
    try {
      await fs.writeFileSync(dataPath, data, {flag: 'as+'});
    } catch (err) {
      console.log(err)
    }

    return {
      src: `${host}:4399/image/${dataName}`,
      success: 'ok'
    };
  }
}
