import { ITeam } from '@modules/team/entity/team.entity';
import { useUpdateTeam } from '@modules/team/mutate/team.patch';
import { Dispatch, SetStateAction } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import '../../stylesheets/kanban.css';
import { KanbanColumn } from './kanban-column';
interface KanbanProps {
  data: ITeam[];
  setData: Dispatch<SetStateAction<ITeam[]>>;
}

export const Kanban: React.FC<KanbanProps> = ({ data, setData }) => {
  const { mutate } = useUpdateTeam();

  const handleDragEnd = (e: DropResult) => {
    const { destination, source, type } = e;
    const copied = [...data];
    if (!destination) return;

    if (type === 'DEFAULT') {
      // ! reorder column case
      const [removed] = copied.splice(source.index, 1);
      copied.splice(destination.index, 0, removed);
      setData(copied);
      mutate(copied);
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
      const [removed] = sourceColumn.accounts.splice(source.index, 1);
      destColumn.accounts.splice(destination.index, 0, removed);
      const result = copied.map((item) => {
        if (item.id === source.droppableId) return sourceColumn;
        if (item.id === destination.droppableId) return destColumn;
        return item;
      });
      mutate(result);
      setData(result);
    } else {
      // !drag into the same column case
      const column = copied.find((item) => item.id === destination.droppableId);
      if (!column) return;
      const [removed] = column.accounts.splice(source.index, 1);
      column.accounts.splice(destination.index, 0, removed);
      const result = copied.map((item) =>
        item.id === destination.droppableId ? column : item
      );
      setData(result);
      mutate(result);
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
