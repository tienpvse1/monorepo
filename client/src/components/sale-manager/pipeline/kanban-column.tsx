import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { Dispatch, SetStateAction } from 'react';
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
  columns: IPipelineColumn[],
  setCurrentColumn: Dispatch<SetStateAction<Partial<IPipelineColumn>>>,
  _snapshot?: DroppableStateSnapshot
) => {
  return (
    <div {...e.droppableProps} ref={e.innerRef} style={{ display: 'flex' }}>
      {columns.map((column, index) => (
        <Draggable index={index} key={column.id} draggableId={column.id}>
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
                flexShrink: 0,
              }}
            >
              <KanbanColumnHeader
                handleDrag={provided.dragHandleProps}
                data={column}
                setCurrentColumn={setCurrentColumn}
              />
              <Droppable droppableId={column.id} type='column'>
                {(provided, snapshot) =>
                  KanBanItem(provided, column.pipelineItems, snapshot)
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
