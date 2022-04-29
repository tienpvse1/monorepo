import { Optional } from '@nestjs/common';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateDiscountCodeDto {
  @IsNumber()
  @Max(1)
  @Min(0)
  discount_amount: number;

  @IsString()
  discount_name: string;
  expired_at: Date;
  // @Length(10)
  // @Optional()
  // pipeline_item_id?: string;
}
