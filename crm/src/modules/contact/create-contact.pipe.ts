import { Injectable, PipeTransform } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class CreateContactPipe implements PipeTransform {
  transform(value: CreateContactDto) {
    if (value.addresses)
      value.addresses = value.addresses.map((item) => ({
        ...item,
        id: nanoid(10),
      }));
    if (value.noteWorthies)
      value.noteWorthies = value.noteWorthies.map((item) => ({
        ...item,
        id: nanoid(10),
      }));
    return value;
  }
}
