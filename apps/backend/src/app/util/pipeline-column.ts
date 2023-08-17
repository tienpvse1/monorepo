import { PipelineColumn } from 'src/modules/pipeline-module/pipeline-column/entities/pipeline-column.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';

export const reIndexItems = (pipelineColumn: PipelineColumn) => {
  // sort first!
  pipelineColumn.pipelineItems = pipelineColumn.pipelineItems.sort(
    (item1, item2) => item1.index - item2.index,
  );

  pipelineColumn.pipelineItems = pipelineColumn.pipelineItems.map(
    (item, index) =>
      ({
        ...item,
        index,
      } as PipelineItem),
  );
};
