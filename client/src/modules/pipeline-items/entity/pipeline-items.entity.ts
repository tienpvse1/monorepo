import { IBase } from '@interfaces/base';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';

export interface IPipelineItem extends IBase {
  name: string;
  index: number;
  pipelineColumn: IPipelineColumn;
}
