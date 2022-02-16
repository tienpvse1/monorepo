import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService extends BaseService<History> {
  constructor(@InjectRepository(History) repository: Repository<History>) {
    super(repository);
  }
}
