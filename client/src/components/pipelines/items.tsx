import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { CreateCardItem } from './pipeline-items/create-card';
import { PipelineCardItem } from './pipeline-items/card-item';
import { ThemeColor } from '@constance/color';

interface PipelineItemsProps {
  pipelineColumn: IPipelineColumn;
  showCreateItemForm: boolean;
  setShowCreateItemForm: () => void;
  isWonStage?: boolean
}
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  border: isDragging ? `2px solid ${ThemeColor.primaryColor}` : '',
  ...draggableStyle
})

export const PipelineItems: React.FC<PipelineItemsProps> = ({
  pipelineColumn,
  setShowCreateItemForm,
  showCreateItemForm,
  isWonStage
}) => {

  return (
    <>
      <Droppable
        isDropDisabled={isWonStage && true}
        droppableId={pipelineColumn.id}
        type='task'
      >
        {(provided) => (
          <div
            className='pipeline-column scroll-menu-pipeline-2'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {showCreateItemForm && (
              <CreateCardItem
                pipelineColumnID={pipelineColumn.id}
                toggleClose={setShowCreateItemForm}
              />
            )}
            {pipelineColumn.pipelineItems.map(
              (data: IPipelineItem, index: number) => (
                <Draggable isDragDisabled={pipelineColumn.isWon} key={data.id} draggableId={data.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className='wrapper-draggable-card'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <PipelineCardItem cardData={data} />
                    </div>
                  )}
                </Draggable>
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};
