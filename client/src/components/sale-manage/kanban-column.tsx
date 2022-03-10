import { ITeam } from '@modules/team/entity/team.entity';
import {
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { KanbanColumnHeader } from './kanban-column-header';
import { KanBanItem } from './kanban-item';

export const KanbanColumn = (
  e: DroppableProvided,
  teams: ITeam[],
  _snapshot?: DroppableStateSnapshot
) => {
  return (
    <div {...e.droppableProps} ref={e.innerRef} style={{ display: 'flex' }}>
      {teams.map((team, index) => (
        <Draggable index={index} key={team.id} draggableId={team.id}>
          {(provided, _snapshot) => (
            <div
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
              <KanbanColumnHeader
                handleDrag={provided.dragHandleProps}
                data={team}
              />
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
