import { IAccount } from '@interfaces/account';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { KanbanColumn } from './kanban-column';
interface KanbanProps {}
export type KanBanFakeData = {
  id: string;
  name: string;
  color?: string;
  accounts: Partial<IAccount & { id: string }>[];
};
const fakeData: KanBanFakeData[] = [
  {
    id: nanoid(5),
    name: 'Not assigned',
    color: 'green',
    accounts: [
      {
        id: nanoid(5),
        firstName: 'tien',
        lastName: 'phan',
      },
      {
        id: nanoid(5),
        firstName: 'John',
        lastName: 'Doe',
      },
    ],
  },
  { id: nanoid(5), color: 'blue', name: 'Team 1', accounts: [] },
  { id: nanoid(5), color: 'purple', name: 'Team 3', accounts: [] },
];

export const Kanban: React.FC<KanbanProps> = ({}) => {
  const [data, setData] = useState(fakeData);

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
      const [removed] = sourceColumn.accounts.splice(source.index, 1);
      destColumn.accounts.splice(destination.index, 0, removed);
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
      const [removed] = column.accounts.splice(source.index, 1);
      column.accounts.splice(destination.index, 0, removed);
      const result = copied.map((item) =>
        item.id === destination.droppableId ? column : item
      );
      setData(result);
    }
  };

  return (
    <DragDropContext onDragEnd={(e) => handleDragEnd(e)}>
      <Droppable direction='horizontal' droppableId='kanban-table'>
        {(provided, snapshot) => KanbanColumn(provided, data, snapshot)}
      </Droppable>
    </DragDropContext>
  );
};
