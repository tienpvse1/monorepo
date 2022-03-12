import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { Dispatch, SetStateAction } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import '../../../stylesheets/kanban.css';
import { KanbanColumn } from './kanban-column';
interface KanbanProps {
  data: IPipelineColumn[];
  setData: Dispatch<SetStateAction<IPipelineColumn[]>>;
}

export const Kanban: React.FC<KanbanProps> = ({ data, setData }) => {
  const handleDragEnd = (e: DropResult) => {
    const { destination, source, type } = e;
    const copied = [...data];
    if (!destination) return;

    if (type === 'DEFAULT') {
      // ! reorder column case
      const [removed] = copied.splice(source.index, 1);
      copied.splice(destination.index, 0, removed);
      setData(copied);
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      // !drag into others column case
      const sourceColumn = copied.find(
        (item) => item.id === source.droppableId
      );
      const destColumn = copied.find(
        (item) => item.id === destination.droppableId
      );
      if (!sourceColumn || !destColumn) return;
      const [removed] = sourceColumn.pipelineItems.splice(source.index, 1);
      destColumn.pipelineItems.splice(destination.index, 0, removed);
      const result = copied.map((item) => {
        if (item.id === source.droppableId) return sourceColumn;
        if (item.id === destination.droppableId) return destColumn;
        return item;
      });
      setData(result);
    } else {
      // !drag into the same column case
      const column = copied.find((item) => item.id === destination.droppableId);
      if (!column) return;
      const [removed] = column.pipelineItems.splice(source.index, 1);
      column.pipelineItems.splice(destination.index, 0, removed);
      const result = copied.map((item) =>
        item.id === destination.droppableId ? column : item
      );
      setData(result);
    }
  };

  return (
    <div
      style={{
        overflowY: 'hidden',
        overflowX: 'scroll',
        minHeight: 600,
      }}
    >
      <DragDropContext onDragEnd={(e) => handleDragEnd(e)}>
        <Droppable direction='horizontal' droppableId='kanban-table'>
          {(provided, snapshot) => KanbanColumn(provided, data, snapshot)}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
