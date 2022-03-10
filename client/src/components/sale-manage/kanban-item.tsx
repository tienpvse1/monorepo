import { IAccount } from '@interfaces/account';
import { Card } from 'antd';
import {
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';

export const KanBanItem = (
  provided: DroppableProvided,
  accounts: Partial<IAccount & { id: string }>[],
  snapshot: DroppableStateSnapshot
) => {
  return (
    <div {...provided.droppableProps} ref={provided.innerRef}>
      {accounts.map((account, index) => (
        <Draggable draggableId={account.id} index={index}>
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
              <Card title=''>
                <p>{account.firstName}</p>
              </Card>
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
};
