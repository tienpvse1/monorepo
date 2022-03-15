import { IBase } from '@interfaces/base';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';

export interface UpdatePipelineDto extends IBase {
  name: string;
  pipelineColumns: IPipelineColumn[];
}
