import { PartialType } from '@nestjs/swagger';
import { CreateProductAccountDto } from './create-product-account.dto';

export class UpdateProductAccountDto extends PartialType(CreateProductAccountDto) {}
