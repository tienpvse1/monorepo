import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@EntityRepository(Contact)
export class ContactRepository extends BaseRepository<Contact> {}
