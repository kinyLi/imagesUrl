import { Controller, Post, Req, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return {message: 'Hello word'}
  }

  @Post('setImage')
  async setImage(@Req() req: AppDto) {
    return await this.appService.setImage(req)
  }
}
