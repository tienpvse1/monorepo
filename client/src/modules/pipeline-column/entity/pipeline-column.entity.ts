import { IBase } from '@interfaces/base';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';

export interface IPipelineColumn extends IBase {
  name: string;
  pipeline: string;
  pipelineItems: IPipelineItem[];
  index: number;
  isWon: boolean;
  expectedClosing: string;
}
