import { Length } from 'class-validator';

export class CreateProductAccountDto {
  @Length(10)
  productId: string;
  @Length(10)
  accountId: string;
}
