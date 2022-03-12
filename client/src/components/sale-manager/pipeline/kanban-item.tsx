import {
  DeleteOutlined,
  EllipsisOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { useBooleanToggle } from '@mantine/hooks';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { useAssignAccount } from '@modules/pipeline-items/mutation/pipeline-item.patch';
import { Avatar, Card, Tooltip } from 'antd';
import {
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { AccountList } from './account-list';

export const KanBanItem = (
  provided: DroppableProvided,
  pipelineItems: IPipelineItem[],
  _snapshot: DroppableStateSnapshot
) => {
  const { mutate } = useAssignAccount();
  const [value, toggle] = useBooleanToggle(false);
  const handleAssignClick = (accountId: string, id: string) => {
    // mutate({
    //   accountId,
    //   id,
    // });
    toggle();
  };
  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      style={{ height: '100%' }}
    >
      {pipelineItems.map((item, index) => (
        <Draggable draggableId={item.id} key={item.id} index={index}>
          {(provided, _snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
                marginTop: 10,
              }}
            >
              <AccountList toggle={toggle} visible={value} />
              <Card
                title=''
                style={{
                  boxShadow:
                    '0 10px 20px rgba(0,0,0,0.06), 0 6px 6px rgba(0,0,0,0.10)',
                }}
                actions={[
                  <Tooltip title='Lose this opportunity' placement='bottom'>
                    <DeleteOutlined />
                  </Tooltip>,
                  <Tooltip placement='bottom' title='Assign'>
                    <UserSwitchOutlined
                      onClick={() => handleAssignClick('DC8B8a1fqd', item.id)}
                    />
                  </Tooltip>,
                  <Tooltip placement='bottom' title='More'>
                    <EllipsisOutlined key='ellipsis' />
                  </Tooltip>,
                ]}
              >
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <Card.Meta
                    title={item.name}
                    description='This is the description'
                    avatar={
                      <Avatar
                        src={
                          item.photo ? item.photo : 'https://i.pravatar.cc/200'
                        }
                      />
                    }
                  ></Card.Meta>
                </div>
              </Card>
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
};
