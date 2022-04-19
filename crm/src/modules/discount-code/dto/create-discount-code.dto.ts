import { IsNumber, Length, Max, Min } from 'class-validator';

export class CreateDiscountCodeDto {
  @IsNumber()
  @Max(1)
  @Min(0)
  discount_amount: number;

  expired_at: Date;
  @Length(10)
  pipeline_item_id: string;
}
