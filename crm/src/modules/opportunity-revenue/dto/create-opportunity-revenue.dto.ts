import { IsInt, Length } from 'class-validator';

export class CreateOpportunityRevenueDto {
  @Length(10)
  productId: string;
  @IsInt()
  quantity: number;
}
