import {
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { KanBanFakeData } from './kanban';
import { KanbanColumnHeader } from './kanban-column-header';
import { KanBanItem } from './kanban-item';

export const KanbanColumn = (
  e: DroppableProvided,
  teams: KanBanFakeData[],
  _snapshot?: DroppableStateSnapshot
) => {
  return (
    <div {...e.droppableProps} ref={e.innerRef} style={{ display: 'flex' }}>
      {teams.map((team, index) => (
        <Draggable index={index} key={team.id} draggableId={team.id}>
          {(provided, _snapshot) => (
            <div
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
              style={{
                ...provided.draggableProps.style,
                width: 250,
                minHeight: 600,
                marginLeft: 10,
                padding: '10px ',
              }}
            >
              <KanbanColumnHeader data={team} />
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
