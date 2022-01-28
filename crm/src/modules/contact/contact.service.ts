import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { ContactRepository } from './contact.repository';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService extends BaseService<Contact> {
  constructor(@InjectRepository(Contact) repository: ContactRepository) {
    super(repository);
  }
}
