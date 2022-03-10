import { IAccount } from '@interfaces/account';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { KanbanColumn } from './kanban-column';
interface KanbanProps {}
export type KanBanFakeData = {
  id: string;
  name: string;
  accounts: Partial<IAccount & { id: string }>[];
}[];
const fakeData: KanBanFakeData = [
  {
    id: nanoid(5),
    name: 'Not assigned',
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
  { id: nanoid(5), name: 'Team 1', accounts: [] },
  { id: nanoid(5), name: 'Team 3', accounts: [] },
];

export const Kanban: React.FC<KanbanProps> = ({}) => {
  const [data, setData] = useState(fakeData);
  return (
    <DragDropContext onDragEnd={(e) => console.log(e)}>
      <Droppable direction='horizontal' droppableId='kanban-table'>
        {(provided, snapshot) => KanbanColumn(provided, data, snapshot)}
      </Droppable>
    </DragDropContext>
  );
};
