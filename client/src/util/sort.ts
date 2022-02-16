import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import {} from 'lodash';
export const sortPipeline = (pipeline: IPipeline) => {
  // sort item
  pipeline.pipelineColumns.forEach((item) =>
    item.pipelineItems.sort((a, b) => a.index - b.index)
  );

  // sort column
  pipeline.pipelineColumns.sort((a, b) => a.index - b.index);
  return pipeline;
};
