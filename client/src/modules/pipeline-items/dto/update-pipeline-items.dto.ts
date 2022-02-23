import { IBase } from "@interfaces/base";
import { IPipelineColumn } from "@modules/pipeline-column/entity/pipeline-column.entity";

export interface IUpdatePipelineItemDto extends IBase{
  name: string;
  pipelineColumn: IPipelineColumn;
}