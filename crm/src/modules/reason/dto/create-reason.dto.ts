import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { ReasonType } from '../entities/reason.entity';

export class CreateReasonDto {
  @Length(10)
  pipelineItemId: string;
  @Length(1)
  reason: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsEnum(ReasonType)
  reasonType: ReasonType;
}
