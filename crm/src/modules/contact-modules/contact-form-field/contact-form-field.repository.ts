import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { ContactFormField } from './entities/contact-form-field.entity';

@EntityRepository(ContactFormField)
export class ContactFormFieldRepository extends BaseRepository<ContactFormField> {}
