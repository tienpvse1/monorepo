import { OpportunityHistoryType } from '@modules/opportunity-history/entity/opportunity-history.entity';
import { usePostOpportunityHistory } from '@modules/opportunity-history/mutation/opportunity-history.post';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { useChangePipeline } from '@modules/pipeline/mutation/pipeline.update';
import { abstractReIndex } from '@util/array';
import { startFireworks } from '@util/firework';
import { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import '../../../stylesheets/kanban.css';
import { CreateOpportunity } from './drawer';
import { KanbanColumn } from './kanban-column';
interface KanbanProps {
  data: IPipelineColumn[];
  setData: (pipeline: IPipelineColumn[]) => void;
}

export const Kanban: React.FC<KanbanProps> = ({ data, setData }) => {
  const { mutate } = useChangePipeline();
  const [currentColumn, setCurrentColumn] =
    useState<Partial<IPipelineColumn>>(undefined);
  const { mutateAsync: mutateOpportunityHistory } = usePostOpportunityHistory();
  const handleDragEnd = (e: DropResult) => {
    const { destination, source, type, draggableId } = e;
    const copied = [...data];
    if (!destination) return;

    if (type === 'DEFAULT') {
      // ! reorder column case
      const [removed] = copied.splice(source.index, 1);
      copied.splice(destination.index, 0, removed);
      setData(copied);
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      // !drag into others column case
      const sourceColumn = copied.find(
        (item) => item.id === source.droppableId
      );
      const destColumn = copied.find(
        (item) => item.id === destination.droppableId
      );
      if (!sourceColumn || !destColumn) return;
      const [removed] = sourceColumn.pipelineItems.splice(source.index, 1);
      destColumn.pipelineItems.splice(destination.index, 0, removed);
      const result = copied.map((item) => {
        if (item.id === source.droppableId) return sourceColumn;
        if (item.id === destination.droppableId) return destColumn;
        return item;
      });
      const reIndexed = abstractReIndex(result, 'pipelineItems');
      console.log(reIndexed);
      if (destColumn.isWon) startFireworks();
      mutateOpportunityHistory({
        newStageID: destination.droppableId,
        oldStageId: source.droppableId,
        description: `moved from ${sourceColumn.name} to ${destColumn.name}`,
        pipelineItemId: draggableId,
        type: OpportunityHistoryType.CHANGE_STATE,
      });
      mutate({
        pipelineColumns: reIndexed,
        id: 'hard-coded-id',
      });
      setData(reIndexed);
    } else {
      // !drag into the same column case
      const column = copied.find((item) => item.id === destination.droppableId);
      if (!column) return;
      const [removed] = column.pipelineItems.splice(source.index, 1);
      column.pipelineItems.splice(destination.index, 0, removed);
      const result = copied.map((item) =>
        item.id === destination.droppableId ? column : item
      );
      const reIndexed = abstractReIndex(result, 'pipelineItems');
      mutate({
        pipelineColumns: reIndexed,
        id: 'hard-coded-id',
      });
      setData(reIndexed);
    }
  };
  const closeDrawer = () => {
    setCurrentColumn(null);
  };
  return (
    <div
      style={{
        overflowY: 'hidden',
        overflowX: 'scroll',
        minHeight: 600,
      }}
    >
      {currentColumn && (
        <CreateOpportunity
          visible={currentColumn != undefined}
          column={currentColumn}
          toggle={closeDrawer}
        />
      )}
      <DragDropContext onDragEnd={(e) => handleDragEnd(e)}>
        <Droppable direction='horizontal' droppableId='kanban-table'>
          {(provided, snapshot) =>
            KanbanColumn(provided, data, setCurrentColumn, snapshot)
          }
        </Droppable>
      </DragDropContext>
    </div>
  );
};
