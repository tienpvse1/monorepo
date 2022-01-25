import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { EmailTemplateRepository } from './email-template.repository';
import { EmailTemplate } from './entities/email-template.entity';

@Injectable()
export class EmailTemplateService extends CRUDService<
  EmailTemplate,
  EmailTemplateRepository
> {
  constructor(
    @InjectRepository(EmailTemplateRepository)
    repository: EmailTemplateRepository,
  ) {
    super(repository);
  }
}
