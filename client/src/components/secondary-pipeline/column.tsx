import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import {
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { Items } from './item';

export const SecondaryPipelineColumn = (
  provided: DroppableProvided,
  snapshot: DroppableStateSnapshot,
  data: IPipeline
) => {
  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      style={{ display: 'flex', overflowX: 'scroll', minHeight: 500 }}
    >
      {data.pipelineColumns.map((column, index) => (
        <Draggable key={column.id} draggableId={column.id} index={index}>
          {(provided, snapshot) => (
            <div
              {...provided.draggableProps}
              ref={provided.innerRef}
              style={{
                ...provided.draggableProps.style,
                flexBasis: 250,
                minHeight: 500,
                margin: 20,
                padding: 20,
                backgroundColor: '#f1f3f5',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '100%',
                  fontSize: '17px',
                  paddingBottom: '10px',
                }}
                {...provided.dragHandleProps}
              >
                {column.name}
              </div>
              <Droppable droppableId={column.id} type='column'>
                {(provided, snapshot) =>
                  Items(provided, snapshot, column.pipelineItems)
                }
              </Droppable>
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
};
