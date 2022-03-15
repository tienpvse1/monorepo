import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
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
  columns: IPipelineItem[][],
  _snapshot?: DroppableStateSnapshot
) => {
  return (
    <div {...e.droppableProps} ref={e.innerRef} style={{ display: 'flex' }}>
      {columns.map((column, index) => (
        <Draggable
          index={index}
          key={index}
          isDragDisabled={true}
          draggableId={index.toString()}
        >
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
                index={index}
              />
              <Droppable droppableId={index.toString()} type='column'>
                {(provided, snapshot) => KanBanItem(provided, column, snapshot)}
              </Droppable>
            </div>
          )}
        </Draggable>
      ))}
      {e.placeholder}
    </div>
  );
};
