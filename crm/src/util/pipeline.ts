import { PipelineColumn } from 'src/modules/pipeline-module/pipeline-column/entities/pipeline-column.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { UpdatePipelineDto } from 'src/modules/pipeline-module/pipeline/dto/update-pipeline.dto';
export const sortPipeline = (pipeline: UpdatePipelineDto) => {
  // sort item
  pipeline.pipelineColumns.forEach((item) =>
    item.pipelineItems.sort((a, b) => a.index - b.index),
  );

  // sort column
  pipeline.pipelineColumns.sort((a, b) => a.index - b.index);
  return pipeline;
};

export const reIndexPipeline = (pipeline: UpdatePipelineDto) => {
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

export const sortColumns = (columns: PipelineColumn[]) => {
  columns.forEach((item) => {
    item.pipelineItems.sort((a, b) => a.index - b.index);
  });
  columns.sort((a, b) => a.index - b.index);
  return columns;
};

export const reIndexColumn = (columns: PipelineColumn[]) => {
  // re-index items
  const result = columns.map((column, columnIndex) => {
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
  });
  return result;
};
