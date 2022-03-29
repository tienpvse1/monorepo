import { IBase } from "@interfaces/base";
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";

export interface IReason extends IBase {
  reasonType: string;
  reason: string;
  description: string;
  pipelineItem: IPipelineItem
}