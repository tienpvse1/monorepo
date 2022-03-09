import { PipelineColumn } from 'src/modules/pipeline-module/pipeline-column/entities/pipeline-column.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { CreatePipelineDto } from 'src/modules/pipeline-module/pipeline/dto/create-pipeline.dto';
import { UpdatePipelineDto } from 'src/modules/pipeline-module/pipeline/dto/update-pipeline.dto';
import { Pipeline } from 'src/modules/pipeline-module/pipeline/entities/pipeline.entity';
export const sortPipeline = (
  pipeline: UpdatePipelineDto | CreatePipelineDto | Pipeline,
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
  return pipeline;
};

export const filterOutOpportunity = (pipeline: Pipeline, accountId: string) => {
  const newColumns = pipeline.pipelineColumns.map((column) => {
    if (column.pipelineItems.length === 0) {
      return column;
    }

    return {
      ...column,
      pipelineItems: column.pipelineItems.filter(
        (item) => item.account.id === accountId,
      ),
    } as PipelineColumn;
  });

  return {
    ...pipeline,
    pipelineColumns: newColumns,
  };
};
