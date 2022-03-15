import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { HistoryType } from '../entities/opportunity-history.entity';

export class CreateOpportunityHistoryDto {
  @IsString()
  @IsOptional()
  description?: string;
  @IsEnum(HistoryType)
  @IsOptional()
  type: HistoryType;
  @Length(10)
  oldStageId: string;
  @Length(10)
  newStageID: string;
  @Length(10)
  pipelineItemId: string;
}
