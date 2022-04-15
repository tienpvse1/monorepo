import { Controller, Get, Post } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(@InjectKnex() private knex: Knex) {}
  @Post('/app/webhook')
  handleWebhook() {
    return {};
  }
  @Public()
  @Get('test-knex')
  async handleKnexTest() {
    return this.knex.table('account').first('*');
  }
}
