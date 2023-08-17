import { Injectable, PipeTransform } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class UpdateContactPipePipe implements PipeTransform {
  transform(value: UpdateContactDto) {
    if (value.noteWorthies)
      value.noteWorthies = value.noteWorthies.map((item) => ({
        ...item,
        id: nanoid(10),
      }));
    return value;
  }
}
