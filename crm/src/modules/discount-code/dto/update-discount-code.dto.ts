import { PartialType } from '@nestjs/swagger';
import { CreateDiscountCodeDto } from './create-discount-code.dto';

export class UpdateDiscountCodeDto extends PartialType(CreateDiscountCodeDto) {}
