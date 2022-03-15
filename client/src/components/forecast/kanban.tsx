import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Dispatch, SetStateAction } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import '../../stylesheets/kanban.css';
import { KanbanColumn } from './kanban-column';
interface KanbanProps {
  data: IPipelineItem[][];
  setData: Dispatch<SetStateAction<IPipelineItem[][]>>;
}

export const Kanban: React.FC<KanbanProps> = ({ data, setData }) => {
  // const { mutate } = useChangePipeline();
  const handleDragEnd = (e: DropResult) => {
    const { destination, source, draggableId } = e;
    console.log(
      '🚀 ~ file: kanban.tsx ~ line 15 ~ handleDragEnd ~ draggableId',
      draggableId
    );

    const copied = [...data];
    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      // !drag into others column case
      const sourceColumn = copied[Number.parseInt(source.droppableId)];
      const destColumn = copied[Number.parseInt(destination.droppableId)];
      if (!sourceColumn || !destColumn) return;
      const [removed] = sourceColumn.splice(source.index, 1);
      destColumn.splice(destination.index, 0, removed);
      const result = copied.map((item, index) => {
        if (index.toString() === source.droppableId) return sourceColumn;
        if (index.toString() === destination.droppableId) return destColumn;
        return item;
      });
      setData(result);
    } else {
      // !drag into the same column case
      const column = copied[Number.parseInt(source.droppableId)];
      if (!column) return;
      const [removed] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removed);
      const result = copied.map((item, index) =>
        index.toString() === destination.droppableId ? column : item
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
