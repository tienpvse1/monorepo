import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService extends BaseService<Tag> {
  constructor(@InjectRepository(Tag) repository: Repository<Tag>) {
    super(repository);
  }
}
