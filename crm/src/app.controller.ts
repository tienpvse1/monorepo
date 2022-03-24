import { Controller, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Post('/app/webhook')
  handleWebhook() {
    console.log('webhook call ');

    return {};
  }
}
