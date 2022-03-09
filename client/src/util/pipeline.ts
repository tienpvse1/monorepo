import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';

export const sortPipeline = (pipeline: Partial<IPipeline>) => {
  pipeline.pipelineColumns.forEach((item) =>
    item.pipelineItems.sort((a, b) => a.index - b.index)
  );

  // sort column
  pipeline.pipelineColumns.sort((a, b) => a.index - b.index);
  return pipeline;
};

export const reIndexPipeline = (pipeline: Partial<IPipeline>) => {
  // re-index items
  pipeline.pipelineColumns = pipeline.pipelineColumns.map(
    (column, columnIndex) => {
      column.pipelineItems = column.pipelineItems.map(
        (item, itemIndex) =>
          ({
            ...item,
            index: itemIndex,
          } as IPipelineItem)
      );
      return {
        ...column,
        index: columnIndex,
      } as IPipelineColumn;
    }
  );
  return pipeline;
};
