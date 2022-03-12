import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService extends BaseService<Subject> {
  constructor(@InjectRepository(Subject) repository: Repository<Subject>) {
    super(repository);
  }
}
