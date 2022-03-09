import { SecondaryPipelineColumn } from '@components/secondary-pipeline/column';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { getPipeline } from '@modules/pipeline/query/pipeline.get';
import { reIndexPipeline } from '@util/pipeline';
import { sortPipeline } from '@util/sort';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

interface SecondaryPipelineProps {}

const SecondaryPipeline: React.FC<SecondaryPipelineProps> = ({}) => {
  const [pipeline, setPipeline] = useState<IPipeline>(undefined);

  const handleDragEnd = (e: DropResult) => {
    const { destination, source, type } = e;
    const copiedPipeline = { ...pipeline };
    if (!destination) return;

    if (type === 'DEFAULT') {
      // ! reorder column case
      const [removed] = copiedPipeline.pipelineColumns.splice(source.index, 1);
      copiedPipeline.pipelineColumns.splice(destination.index, 0, removed);
      setPipeline((prev) => ({
        ...prev,
        pipelineColumns: copiedPipeline.pipelineColumns,
      }));
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      // !drag into others column case
      const sourceColumn = copiedPipeline.pipelineColumns.find(
        (item) => item.id === source.droppableId
      );
      const destColumn = copiedPipeline.pipelineColumns.find(
        (item) => item.id === destination.droppableId
      );
      if (!sourceColumn || !destColumn) return;
      const [removed] = sourceColumn.pipelineItems.splice(source.index, 1);
      destColumn.pipelineItems.splice(destination.index, 0, removed);
      const result = copiedPipeline.pipelineColumns.map((item) => {
        if (item.id === source.droppableId) return sourceColumn;
        if (item.id === destination.droppableId) return destColumn;
        return item;
      });
      setPipeline((prev) => ({
        ...prev,
        pipelineColumns: result,
      }));
    } else {
      // !drag into the same column case
      const column = copiedPipeline.pipelineColumns.find(
        (item) => item.id === destination.droppableId
      );
      if (!column) return;
      const [removed] = column.pipelineItems.splice(source.index, 1);
      column.pipelineItems.splice(destination.index, 0, removed);
      const result = pipeline.pipelineColumns.map((item) =>
        item.id === destination.droppableId ? column : item
      );
      setPipeline((prev) => ({
        ...prev,
        pipelineColumns: result,
      }));
    }
  };

  useEffect(() => {
    getPipeline().then((data) =>
      setPipeline(reIndexPipeline(sortPipeline(data)) as IPipeline)
    );
  }, []);

  return (
    <div>
      {pipeline && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='kanban-table' direction='horizontal'>
            {(provided, snapshot) =>
              SecondaryPipelineColumn(provided, snapshot, pipeline)
            }
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default SecondaryPipeline;
