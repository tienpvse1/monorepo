import {
  DeleteOutlined,
  EllipsisOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { imagePlaceHolderUrl } from '@constance/image';
import { useBooleanToggle } from '@mantine/hooks';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { useLoseOpportunity } from '@modules/pipeline-items/mutation/pipeline-item.patch';
import { Avatar, Badge, Card, Dropdown, Popconfirm, Tooltip } from 'antd';
import { useState } from 'react';
import {
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { AccountList } from './account-list';
import { DetailDropdown } from './drop-down';
import { client } from '../../../App';
import { GET_STAGES } from '@modules/pipeline-column/query/pipeline-column.get';
import { CreateScheduleDrawer } from './create-schedule';
export const KanBanItem = (
  provided: DroppableProvided,
  pipelineItems: IPipelineItem[],
  _snapshot: DroppableStateSnapshot
) => {
  const [currentId, setCurrentId] = useState<string>('');
  const [value, toggle] = useBooleanToggle(false);
  const { mutate } = useLoseOpportunity();
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
    navigate(`/sale-manager/opportunities/view-details/${opportunityId}`);
  };

  const handleLose = (id: string) => {
    mutate({ id }, { onSuccess: () => client.invalidateQueries(GET_STAGES) });
  };

  const [visible, setVisible] = useState(false);

  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      style={{ height: '100%' }}
    >
      <CreateScheduleDrawer isVisible={visible} setVisible={setVisible} />
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
                // @ts-ignore
                display: item.show ? 'block' : 'none',
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
                    <Popconfirm
                      title='Are you sure lose this opportunity?'
                      onConfirm={() => handleLose(item.id)}
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  </Tooltip>,
                  <Dropdown
                    trigger={['hover']}
                    overlay={
                      <DetailDropdown
                        pipelineItemId={item.id}
                        onViewMore={onViewMore}
                        setDrawerVisible={setVisible}
                      />
                    }
                  >
                    <EllipsisOutlined key='ellipsis' />
                  </Dropdown>,
                  <>
                    {item.account ? (
                      <Tooltip
                        placement='bottom'
                        title={item.account.firstName}
                        arrowContent
                      >
                        <Avatar
                          src={
                            item.account?.photo
                              ? item.account.photo
                              : imagePlaceHolderUrl
                          }
                          size='small'
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip placement='bottom' title='Assign'>
                        <UserSwitchOutlined
                          onClick={() => handleAssignClick(item.id)}
                        />
                      </Tooltip>
                    )}
                  </>,
                ]}
              >
                <div style={{}}>
                  <Card.Meta
                    title={
                      <Tooltip
                        title={`priority: ${
                          item.priority === 2
                            ? 'high'
                            : item.priority === 1
                            ? 'medium'
                            : 'low'
                        }`}
                      >
                        <Badge
                          dot
                          color={
                            item.priority === 2
                              ? 'red'
                              : item.priority === 1
                              ? 'yellow'
                              : 'blue'
                          }
                          text={item.name}
                        />
                      </Tooltip>
                    }
                    description={
                      <>
                        <div>
                          <div>contact: {item.contact?.name}</div>
                        </div>
                        <div>
                          manage by: {item.account?.firstName}
                          {item.account?.lastName} ({item.account?.role?.name})
                        </div>
                        {/* <div>source: {item.contact.company.source}</div> */}
                      </>
                    }
                    avatar={
                      <Avatar
                        src={
                          item.contact?.photo
                            ? item.contact.photo
                            : imagePlaceHolderUrl
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
