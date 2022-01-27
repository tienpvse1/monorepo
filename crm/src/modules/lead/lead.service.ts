import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { Lead } from './entities/lead.entity';
import { LeadRepository } from './lead.repository';

@Injectable()
export class LeadService extends CRUDService<Lead, LeadRepository> {
  constructor(@InjectRepository(LeadRepository) repository: LeadRepository) {
    super(repository);
  }
}
