import { DrawerDetails } from '@components/drawer';
import { Loading } from '@components/loading/loading';
import { useToggle } from '@hooks/useToggle';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Suspense, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { OpportunityDetails } from './opportunity/opportunity-details';
import { CardCreateItem } from './pipeline-items/card-create';
import { PipelineCardItem } from './pipeline-items/card-item';

interface PipelineItemsProps {
  pipelineColumn: IPipelineColumn;
  showCreateItemForm: boolean;
  setShowCreateItemForm: () => void;
}

export const PipelineItems: React.FC<PipelineItemsProps> = ({
  pipelineColumn,
  setShowCreateItemForm,
  showCreateItemForm,
}) => {
  const [showDrawer, toggleDrawer] = useToggle();
  // when user hit the view detail of an opportunity, this state will be assigned by opportunity's id
  const [currentOpportunityId, setCurrentOpportunityId] = useState<
    string | undefined
  >(undefined);

  const handleCloseDrawer = () => {
    toggleDrawer();
  };

  return (
    <>
      <Droppable droppableId={pipelineColumn.id} type='task'>
        {(provided) => (
          <div
            className='pipeline-column scroll-menu2'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {showCreateItemForm && (
              <CardCreateItem
                pipelineColumnID={pipelineColumn.id}
                toggleClose={setShowCreateItemForm}
              />
            )}
            {pipelineColumn.pipelineItems.map(
              (data: IPipelineItem, index: number) => (
                <Draggable key={data.id} draggableId={data.id} index={index}>
                  {(provided) => (
                    <div
                      className='wrapper-draggable-card'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PipelineCardItem
                        dataCardPipeline={data}
                        toggleDrawer={toggleDrawer}
                        setCurrentOpportunityId={setCurrentOpportunityId}
                      />
                    </div>
                  )}
                </Draggable>
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <DrawerDetails
        visible={showDrawer}
        onClose={handleCloseDrawer}
        title='Opportunity'
        placement='right'
        width={'100vw'}
      >
        <Suspense fallback={<Loading />}>
          <OpportunityDetails pipelineItemId={currentOpportunityId} />
        </Suspense>
      </DrawerDetails>
    </>
  );
};
