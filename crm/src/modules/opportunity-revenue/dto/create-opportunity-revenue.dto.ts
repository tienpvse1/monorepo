import { IsInt, Length } from 'class-validator';

export class CreateOpportunityRevenueDto {
  @Length(10)
  courseId: string;
  @IsInt()
  quantity: number;
}
