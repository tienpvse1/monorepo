import { object, SchemaOf, string } from 'yup';
import { CreateContactDto } from '../dto/create-contact.dto';

export const contactSchema: SchemaOf<CreateContactDto> = object().shape({
  address: string().required('address is required'),
  birth: string().required(),
  name: string().required(),
  phone: string().required(),
  type: string().required(),
  email: string().required(),
  addresses: object().optional(),
  
});
