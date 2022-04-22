import { IsInt, Length } from 'class-validator';

export class CreateOpportunityRevenueDto {
  @Length(10)
  courseId: string;
  @IsInt()
  quantity: number;
}

export class KnexCreateOpportunityRevenueDto {
  id: string;
  course_id: string;
  pipeline_item_id: string;
  quantity: number;
}
