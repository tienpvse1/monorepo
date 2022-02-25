import { Optional } from '@nestjs/common';
import { Length } from 'class-validator';

export class CreateAddressDto {
  @Optional()
  @Length(1)
  type: string;
  @Optional()
  @Length(1)
  address: string;
  @Optional()
  @Length(1)
  city: string;
  @Optional()
  @Length(1)
  country: string;
}
