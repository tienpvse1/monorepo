import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService extends BaseService<Message> {
  constructor(@InjectRepository(Message) repository: Repository<Message>) {
    super(repository);
  }
}
