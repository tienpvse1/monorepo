import { Optional } from '@nestjs/common';
import { Length } from 'class-validator';

export class CreateNoteWorthyDto {
  @Optional()
  @Length(1)
  name: string;
  @Optional()
  @Length(1)
  date: Date;
}
