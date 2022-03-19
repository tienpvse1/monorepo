import {
  DeleteOutlined,
  EllipsisOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { useBooleanToggle } from '@mantine/hooks';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Avatar, Card, Dropdown, Tooltip } from 'antd';
import { useState } from 'react';
import {
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { AccountList } from './account-list';
import { DetailDropdown } from './drop-down';

export const KanBanItem = (
  provided: DroppableProvided,
  pipelineItems: IPipelineItem[],
  _snapshot: DroppableStateSnapshot
) => {
  const [currentId, setCurrentId] = useState<string>('');
  const [value, toggle] = useBooleanToggle(false);
  const navigate = useNavigate();
  const handleAssignClick = (id: string) => {
    // mutate({
    //   accountId,
    //   id,
    // });
    setCurrentId(id);
    toggle();
  };

  const onViewMore = (opportunityId: string) => {
    navigate(`/sale-manager/details/${opportunityId}`);
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
              <AccountList toggle={toggle} itemId={currentId} visible={value} />
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
                      onClick={() => handleAssignClick(item.id)}
                    />
                  </Tooltip>,
                  <Tooltip placement='bottom' title='More' arrowContent>
                    <Dropdown
                      trigger={['click']}
                      overlay={
                        <DetailDropdown
                          pipelineItemId={item.id}
                          onViewMore={onViewMore}
                        />
                      }
                    >
                      <EllipsisOutlined key='ellipsis' />
                    </Dropdown>
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
