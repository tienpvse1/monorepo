import { PartialType } from '@nestjs/swagger';
import { CreateContactFormDto } from './create-contact-form.dto';

export class UpdateContactFormDto extends PartialType(CreateContactFormDto) {}
