import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { EmailTemplate } from './entities/email-template.entity';

@EntityRepository(EmailTemplate)
export class EmailTemplateRepository extends BaseRepository<EmailTemplate> {}
