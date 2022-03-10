import {
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { KanBanFakeData } from './kanban';
import { KanBanItem } from './kanban-item';

export const KanbanColumn = (
  e: DroppableProvided,
  teams: KanBanFakeData,
  snaphot?: DroppableStateSnapshot
) => {
  return (
    <div {...e.droppableProps} ref={e.innerRef} style={{ display: 'flex' }}>
      {teams.map((team, index) => (
        <Draggable index={index} key={team.id} draggableId={team.id}>
          {(provided, snapshot) => (
            <div
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
              style={{
                ...provided.draggableProps.style,
                width: 200,
                minHeight: 600,
                marginLeft: 20,
                padding: '10px 20px',
                backgroundColor: snapshot.draggingOver
                  ? 'lightblue'
                  : 'lightgray',
              }}
            >
              <Droppable droppableId={team.id} type='column'>
                {(provided, snapshot) =>
                  KanBanItem(provided, team.accounts, snapshot)
                }
              </Droppable>
            </div>
          )}
        </Draggable>
      ))}
      {e.placeholder}
    </div>
  );
};
