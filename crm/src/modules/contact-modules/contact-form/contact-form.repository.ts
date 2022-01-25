import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { ContactForm } from './entities/contact-form.entity';

@EntityRepository(ContactForm)
export class ContactFormRepository extends BaseRepository<ContactForm> {}
