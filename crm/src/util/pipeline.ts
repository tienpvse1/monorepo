import { PipelineColumn } from 'src/modules/pipeline-module/pipeline-column/entities/pipeline-column.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { CreatePipelineDto } from 'src/modules/pipeline-module/pipeline/dto/create-pipeline.dto';
import { UpdatePipelineDto } from 'src/modules/pipeline-module/pipeline/dto/update-pipeline.dto';
export const sortPipeline = (
  pipeline: UpdatePipelineDto | CreatePipelineDto,
) => {
  // sort item
  pipeline.pipelineColumns.forEach((item) =>
    item.pipelineItems.sort((a, b) => a.index - b.index),
  );

  // sort column
  pipeline.pipelineColumns.sort((a, b) => a.index - b.index);
  return pipeline;
};

export const reIndexPipeline = (
  pipeline: UpdatePipelineDto | CreatePipelineDto,
) => {
  // re-index items
  pipeline.pipelineColumns = pipeline.pipelineColumns.map(
    (column, columnIndex) => {
      column.pipelineItems = column.pipelineItems.map(
        (item, itemIndex) =>
          ({
            ...item,
            index: itemIndex,
          } as PipelineItem),
      );
      return {
        ...column,
        index: columnIndex,
      } as PipelineColumn;
    },
  );
};
