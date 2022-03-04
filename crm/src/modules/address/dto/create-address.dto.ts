import { Optional } from '@nestjs/common';
import { Length } from 'class-validator';
import { AddressTypes } from '../entities/address.entity';

export class CreateAddressDto {
  @Optional()
  @Length(1)
  type: AddressTypes;
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
