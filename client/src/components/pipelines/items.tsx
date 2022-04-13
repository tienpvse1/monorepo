import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { CreateCardItem } from './pipeline-items/create-card';
import { PipelineCardItem } from './pipeline-items/card-item';
import { ThemeColor } from '@constance/color';
import moment from 'moment';
import { dateFormat } from "@constance/date-format";
const { DEFAULT } = dateFormat;

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
}) => {
  const handleFilterMoment = (
    array: IPipelineItem[],
    beforeTime = moment().subtract(1, 'months'),
    afterTime = moment()
  ) => {
    return array.filter((value) =>
      moment(value.createdAt, DEFAULT)
        .isBetween(moment(beforeTime, DEFAULT), moment(afterTime, DEFAULT), undefined, '[]'))
  }

  return (
    <>
      <Droppable
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
            {pipelineColumn.isWon ?
              handleFilterMoment(pipelineColumn.pipelineItems).map(
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
                        <PipelineCardItem cardData={data} isWon={pipelineColumn.isWon} />
                      </div>
                    )}
                  </Draggable>
                )
              ) :
              pipelineColumn.pipelineItems.map(
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
                        <PipelineCardItem cardData={data} isWon={pipelineColumn.isWon} />
                      </div>
                    )}
                  </Draggable>
                )
              )
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};
