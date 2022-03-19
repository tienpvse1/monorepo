import { PlusOutlined } from '@ant-design/icons';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { Progress, Tooltip } from 'antd';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

interface KanbanColumnHeaderProps {
  data: Partial<IPipelineColumn>;
  handleDrag: DraggableProvidedDragHandleProps;
}

export const KanbanColumnHeader: React.FC<KanbanColumnHeaderProps> = ({
  data,
  handleDrag,
}) => {
  const schedulePercents =
    Math.round(
      (data.pipelineItems.filter(
        (item) => item.schedules != null && item.schedules.length > 0
      ).length /
        data.pipelineItems.length) *
        100
    ) || 0;
  return (
    <div
      style={{
        userSelect: 'none',
        backgroundColor: 'white',
      }}
      {...handleDrag}
    >
      <Tooltip title={`${schedulePercents}% has been schedule`}>
        <Progress percent={schedulePercents} status='active' />
      </Tooltip>
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
          {data.pipelineItems ? data.pipelineItems.length : 0}/10{' '}
          <PlusOutlined
            style={{
              backgroundColor: 'rgba(0,0,0,0.07)',
              padding: 5,
              borderRadius: 2,
              marginLeft: 7,
            }}
          />
        </span>
      </div>
    </div>
  );
};
