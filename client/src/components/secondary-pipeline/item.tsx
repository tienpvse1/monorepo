import { MoreOutlined } from '@ant-design/icons';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Card } from 'antd';
import {
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
export const Items = (
  provided: DroppableProvided,
  snapshot: DroppableStateSnapshot,
  data: IPipelineItem[]
) => {
  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      style={{ height: '100%' }}
    >
      {data.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided, snapshot) => (
            <div
              {...provided.draggableProps}
              style={{
                ...provided.draggableProps.style,
                minHeight: 100,
                marginTop: 10,
                userSelect: 'none',
              }}
              ref={provided.innerRef}
            >
              <Card
                hoverable
                style={{ width: 240 }}
                bordered={false}
                extra={<MoreOutlined />}
              >
                <Card.Meta
                  title={
                    <div
                      {...provided.dragHandleProps}
                      style={{
                        width: '200px',
                        height: '100%',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.name}
                    </div>
                  }
                  description='www.instagram.com'
                />
              </Card>
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
};
