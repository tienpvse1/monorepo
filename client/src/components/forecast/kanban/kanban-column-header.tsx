import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import moment from 'moment';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

interface KanbanColumnHeaderProps {
  index: number;
  data: IPipelineItem[];
  handleDrag: DraggableProvidedDragHandleProps;
}

export const KanbanColumnHeader: React.FC<KanbanColumnHeaderProps> = ({
  index,
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
        <span>
          {index === 0
            ? 'Not categorized'
            : moment()
                .month(index - 1)
                .format('MMMM')}
        </span>
        <span
          style={{
            fontSize: 14,
            color: 'rgba(0,0,0,0.6)',
          }}
        >
          {data ? data.length : 0}/10
        </span>
      </div>
    </div>
  );
};
