import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { getCustomRepository } from 'typeorm';
import { ContactRepository } from '../contact/contact.repository';
import { ContactFormRepository } from './contact-form.repository';
import { ContactForm } from './entities/contact-form.entity';

@Injectable()
export class ContactFormService extends CRUDService<
  ContactForm,
  ContactFormRepository
> {
  constructor(
    @InjectRepository(ContactFormRepository) repository: ContactFormRepository,
  ) {
    super(repository);
  }

  async createForm(contactId: string) {
    const contactRepository = getCustomRepository(ContactRepository);
    const contact = await contactRepository.findById(contactId);

    const form = new ContactForm();
    form.contact = contact;
    return form.save();
  }
}
