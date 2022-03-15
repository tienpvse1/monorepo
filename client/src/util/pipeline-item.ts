import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';

export const getPipelineItems = (pipelineColumns: IPipelineColumn[]) => {
  const result: IPipelineItem[] = [];
  pipelineColumns.forEach((column) => {
    column.pipelineItems.forEach((item) => result.push(item));
  });
  return result;
};

export const categorizePipelineItem = (
  pipelineItems: IPipelineItem[] = [],
  year = new Date().getFullYear()
) => {
  const notCategorized = pipelineItems.filter(
    ({ expectedClosing }) =>
      expectedClosing == null || expectedClosing == undefined
  );

  const yearFiltered = pipelineItems.filter(
    (item) => new Date(item.expectedClosing).getFullYear() === year
  );
  console.log(yearFiltered);

  const months = Array.from(Array(12).keys());
  const result: IPipelineItem[][] = [];
  result.push(notCategorized);
  for (const month of months) {
    const itemsInMonth = yearFiltered.filter(
      (item) => new Date(item.expectedClosing).getMonth() === month
    );
    result.push(itemsInMonth);
  }
  return result;
};
