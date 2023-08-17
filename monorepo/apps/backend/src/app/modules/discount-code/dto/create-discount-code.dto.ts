import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateDiscountCodeDto {
  @IsNumber()
  @Max(1)
  @Min(0)
  discount_amount: number;

  @IsString()
  discount_name: string;
  expired_at: Date;

  @IsOptional()
  @Length(10)
  pipeline_item_id?: string;
}

export class SendDiscountEmailDto {
  contactEmail: string;
  template: string;
}
