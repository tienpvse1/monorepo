import { BellOutlined } from '@ant-design/icons';
import { INotification } from '@modules/notification/entity/notification.entity';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import 'ant-design-pro/dist/ant-design-pro.css';

interface NotificationDropdownProps {
  notifications: INotification[];
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
}) => {
  const transformNotification = (): {
    avatar?: string | React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    datetime?: React.ReactNode;
    extra?: React.ReactNode;
    style?: React.CSSProperties;
  }[] => {
    return notifications.map((item) => ({
      avatar: item.sender.photo,
      datetime: new Date(item.createdAt).toDateString(),
      description: item.description,
      title: item.name,
    }));
  };
  return (
    <div
      style={{
        textAlign: 'right',
        boxShadow: '0 1px 4px rgba(0,21,41,.12)',
        background: 'white',
      }}
    >
      <NoticeIcon
        className='notice-icon'
        bell={
          <BellOutlined
            style={{
              fontSize: 23,
              color: 'rgba(0,0,0,0.7)',
            }}
          />
        }
        count={notifications.filter((item) => !item.seen).length}
      >
        <NoticeIcon.Tab
          onClick={() => console.log('')}
          onClear={() => console.log('')}
          locale=''
          onViewMore={() => console.log('')}
          list={transformNotification()}
          title='notification'
          emptyText='No notification'
          emptyImage='https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
        />
        <NoticeIcon.Tab
          onClick={() => console.log('')}
          onClear={() => console.log('')}
          locale=''
          onViewMore={() => console.log('')}
          list={[]}
          title='message'
          emptyText='No message'
          emptyImage='https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'
        />
      </NoticeIcon>
    </div>
  );
};

export default NotificationDropdown;
