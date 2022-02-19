import { Controller } from '@nestjs/common';
import { Crud, Override } from '@nestjsx/crud';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';

@Controller('message')
@Crud({
  model: { type: Message },
})
export class MessageController {
  constructor(public service: MessageService) {}

  @Override('getOneBase')
  getOneFunc() {
    return 'jello';
  }
}
