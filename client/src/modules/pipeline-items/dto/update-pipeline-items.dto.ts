import { ICreatePipelineItemsDto } from './create-pipeline-items.dto';

export interface IUpdatePipelineItemDto
  extends Partial<ICreatePipelineItemsDto> {}
export interface IChangeStageDto {
  oldStageId: string;
  newStageId: string;
  index?: number;
}
