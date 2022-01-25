import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { ContactRepository } from './contact.repository';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService extends CRUDService<Contact, ContactRepository> {
  constructor(
    @InjectRepository(ContactRepository) repository: ContactRepository,
  ) {
    super(repository);
  }
}
