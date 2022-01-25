import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { ContactFormFieldRepository } from './contact-form-field.repository';
import { ContactFormField } from './entities/contact-form-field.entity';

@Injectable()
export class ContactFormFieldService extends CRUDService<
  ContactFormField,
  ContactFormFieldRepository
> {
  constructor(
    @InjectRepository(ContactFormFieldRepository)
    repository: ContactFormFieldRepository,
  ) {
    super(repository);
  }
}
