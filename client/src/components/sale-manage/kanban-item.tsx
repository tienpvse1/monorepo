import { IAccount } from '@interfaces/account';
import { Avatar, Card, Tag } from 'antd';
import {
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { Is } from '@common/is';
export const KanBanItem = (
  provided: DroppableProvided,
  accounts: IAccount[],
  _snapshot: DroppableStateSnapshot
) => {
  return (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      style={{ height: '100%', userSelect: 'none' }}
    >
      {accounts?.map((account, index) => (
        <Draggable
          isDragDisabled={account.isLeader}
          draggableId={account.id}
          key={account.id}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
                marginTop: 10,
              }}
            >
              <Card
                title=''
                style={{
                  boxShadow:
                    '0 10px 20px rgba(0,0,0,0.06), 0 6px 6px rgba(0,0,0,0.10)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <Card.Meta
                    title={`${account.firstName} ${account.lastName}`}
                    description={
                      <div>
                        <Is condition={account.isLeader}>
                          <Tag color={'error'}>Leader</Tag>
                        </Is>
                        <Is
                          condition={
                            account.team != null && account.team != undefined
                          }
                        >
                          <div>team: {account.team?.name}</div>
                        </Is>
                        <div>{account.email}</div>
                      </div>
                    }
                    avatar={
                      <Avatar
                        src={
                          account.photo
                            ? account.photo
                            : 'https://i.pravatar.cc/200'
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
