import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';

@Injectable()
export class LeadService extends BaseService<Lead> {
  constructor(@InjectRepository(Lead) repository: Repository<Lead>) {
    super(repository);
  }
}
