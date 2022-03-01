import { CreateContactDto } from './create-contact.dto';
export interface UpdateContactDto extends Partial<CreateContactDto> {}
