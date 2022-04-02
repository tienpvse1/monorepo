import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { InternalServerEvent } from 'src/constance/event';
import { WebHookDto } from './dto/create-webhook.dto';
import { WebhookService } from './webhook.service';

@Controller('webhook')
@Public()
@ApiTags('webhook')
export class WebhookController {
  constructor(
    private eventEmitter: EventEmitter2,
    private service: WebhookService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: WebHookDto) {
    this.eventEmitter.emit(InternalServerEvent.WEBHOOK_SENT_EVENT, body);
    const result = await this.service.saveAsInboxToDataBase(body);
    return result;
  }
  @Post('hook1')
  @HttpCode(HttpStatus.OK)
  async testHook(@Body() body: WebHookDto) {
    this.eventEmitter.emit(InternalServerEvent.WEBHOOK_SENT_TEST_EVENT, body);
  }

  @Patch('')
  update(@Body() body: any) {
    return body;
  }
}
