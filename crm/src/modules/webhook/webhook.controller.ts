import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Public } from 'src/common/decorators/public.decorator';
import { InternalServerEvent } from 'src/constance/event';

@Controller('webhook')
@Public()
export class WebhookController {
  constructor(private eventEmitter: EventEmitter2) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() body: any) {
    this.eventEmitter.emit(InternalServerEvent.WEBHOOK_SENT_EVENT, body);
    return body;
  }

  @Patch('')
  update(@Body() body: any) {
    return body;
  }
}
