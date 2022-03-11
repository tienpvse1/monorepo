import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

interface KanbanColumnHeaderProps {
  data: Partial<IPipelineColumn>;
  handleDrag: DraggableProvidedDragHandleProps;
}

export const KanbanColumnHeader: React.FC<KanbanColumnHeaderProps> = ({
  data,
  handleDrag,
}) => {
  return (
    <div
      style={{
        userSelect: 'none',
        backgroundColor: 'white',
      }}
      {...handleDrag}
    >
      <div
        style={{
          height: '3px',
          backgroundColor: 'green',
          marginBottom: '5px',
        }}
      ></div>
      <div
        style={{
          boxShadow:
            ' 0 10px 28px rgba(0,0,0,0.15), 0 6px 10px rgba(0,0,0,0.12)',
          padding: '10px',
          fontSize: 17,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{data.name}</span>
        <span
          style={{
            fontSize: 14,
            color: 'rgba(0,0,0,0.6)',
          }}
        >
          {data.pipelineItems ? data.pipelineItems.length : 0}/10
        </span>
      </div>
    </div>
  );
};
