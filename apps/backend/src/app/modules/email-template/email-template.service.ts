import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { EmailTemplate } from './entities/email-template.entity';

@Injectable()
export class EmailTemplateService extends BaseService<EmailTemplate> {
  constructor(
    @InjectRepository(EmailTemplate)
    repository: Repository<EmailTemplate>,
  ) {
    super(repository);
  }
}
