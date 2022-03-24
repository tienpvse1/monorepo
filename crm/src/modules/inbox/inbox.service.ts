import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Inbox } from './entities/inbox.entity';

@Injectable()
export class InboxService extends BaseService<Inbox> {
  constructor(@InjectRepository(Inbox) readonly repository: Repository<Inbox>) {
    super(repository);
  }
}
