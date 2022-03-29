import { Is } from '@common/is';
import { INotification } from '@modules/notification/entity/notification.entity';
import { Avatar, Badge, Comment, Tooltip } from 'antd';
import moment from 'moment';
interface NotificationDropdownProps {
  data: INotification[];
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  data,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {data
        .filter((_item, index) => index < 5)
        .map((notification) => (
          <Badge
            dot={!notification.seen}
            style={{
              display: 'block',
            }}
            key={notification.id}
          >
            <Comment
              author={`${notification.sender.firstName} ${notification.sender.lastName}`}
              avatar={
                <Avatar
                  src={notification.sender.photo}
                  alt={`${notification.sender.firstName} ${notification.sender.lastName}`}
                />
              }
              content={notification.description}
              datetime={
                <Tooltip
                  title={moment(new Date(notification.createdAt)).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                >
                  <span>
                    {moment(new Date(notification.createdAt)).fromNow()}
                  </span>
                </Tooltip>
              }
            />
          </Badge>
        ))}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          color: '#f5222d',
          cursor: 'pointer',
        }}
      >
        <Is condition={data.length > 5}>More...</Is>
      </div>
    </div>
  );
};
