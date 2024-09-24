import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  async index() {
    return {
      message: 'API desenvolvida por @lsprdev',
      data: {
        version: '1.0.0',
      },
    };
  }
}

