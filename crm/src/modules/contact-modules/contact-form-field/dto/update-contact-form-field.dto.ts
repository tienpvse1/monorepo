import { PartialType } from '@nestjs/swagger';
import { CreateContactFormFieldDto } from './create-contact-form-field.dto';

export class UpdateContactFormFieldDto extends PartialType(CreateContactFormFieldDto) {}
