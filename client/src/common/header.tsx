import {
  BellOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import HeaderDrawer from '@components/header/header-drawer';
import { Loading } from '@components/loading/loading';
import { NotificationDropdown } from '@components/sale-manager/header/notification-dropdown';
import { NotificationTime } from '@components/sale-manager/header/notification-timer';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { EMAIL_BOT } from '@constance/crm-bot';
import { envVars } from '@env/var.env';
import { useSocket } from '@hooks/socket';
import { IAccount } from '@interfaces/account';
import { ReceivedEmailDto } from '@modules/notification/dto/create-webhook.dto';
import { INotification } from '@modules/notification/entity/notification.entity';
import { useSeen } from '@modules/notification/mutation/notification.patch';
import {
  getNotifications,
  QUERY_NOTIFICATIONS,
} from '@modules/notification/query/notification.get';
import { useUpcomingEvents } from '@modules/schedule/query/schedule.get';
import { useUpdateSession } from '@modules/session/mutation/session.patch';
import { Avatar, Badge, Dropdown, Tooltip } from 'antd';
import { nanoid } from 'nanoid';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { client } from '../App';
const DropDown = lazy(() => import('@components/header/dropdown'));
const socket = io(`${envVars.VITE_BE_DOMAIN}/notification`);

export const HeaderApp = () => {
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  const { mutate, isError } = useUpdateSession();
  const { mutate: seen } = useSeen();
  const navigate = useNavigate();
  if (isError) navigate('/login');
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => setShowDrawer(!showDrawer);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const currentDate = { ...new Date() } as Date;
  
  const { data: schedules } = useUpcomingEvents({
    accountId: public_user_info.id,
    date: currentDate,
  });
  useEffect(() => {
    mutate({
      notificationId: socket.id,
    });
    getNotifications(public_user_info.id).then((data) => {
      data.sort(
        (b, a) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setNotifications(data);
    });
  }, []);

  const pushNotification = (notification: INotification) => {
    setNotifications((prev) => {
      const result = [...prev, notification];
      result.sort(
        (b, a) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      return result;
    });
  };

  const handleSeen = (isVisible: boolean) => {
    if (isVisible && notifications.some((item) => !item.seen)) {
      seen(undefined, {
        onSettled: () => {
          client.invalidateQueries(QUERY_NOTIFICATIONS);
          setNotifications((prev) =>
            prev.map((item) => ({ ...item, seen: true }))
          );
        },
      });
    }
  };

  useSocket({
    event: 'send-notification',
    onReceive: pushNotification,
    socket,
  });
  useSocket({
    event: 'webhook-sent-event',
    onReceive: (data: ReceivedEmailDto) => {
      console.log(data);
      setNotifications((prev) => {
        return [
          {
            createdAt: new Date(),
            updatedAt: new Date(),
            description: `${data.data?.from?.address} sent you an email`,
            id: nanoid(5),
            name: 'Gmail',
            receiver: public_user_info,
            seen: false,
            sender: EMAIL_BOT as IAccount,
            deletedAt: null,
          },
          ...prev,
        ];
      });
    },
    socket: socket,
  });
  return (
    <div
      style={{
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 15%)',
        height: '65px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 50,
      }}
    >
      {schedules &&
        schedules.map((schedule) => (
          <NotificationTime
            data={schedule}
            key={schedule.id}
            pushNotification={pushNotification}
          />
        ))}
      <HeaderDrawer handleClose={toggleDrawer} visible={showDrawer} />
      <div
        style={{
          display: 'flex',
          gap: 25,
          marginRight: 20,
        }}
      >
        <Tooltip title='Notification'>
          <Dropdown
            trigger={['click']}
            overlayStyle={{
              backgroundColor: 'white',
              padding: '10px 20px',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
            placement='bottomCenter'
            arrow
            onVisibleChange={handleSeen}
            overlay={<NotificationDropdown data={notifications} />}
          >
            <Badge count={notifications.filter((item) => !item.seen).length}>
              <BellOutlined
                style={{ fontSize: 23, color: 'rgba(0,0,0,0.7)' }}
              />
            </Badge>
          </Dropdown>
        </Tooltip>
        <Tooltip title='Tasks'>
          <UnorderedListOutlined
            style={{ fontSize: 23, color: 'rgba(0,0,0,0.7)' }}
          />
        </Tooltip>
        <Tooltip title='Settings'>
          <SettingOutlined
            onClick={toggleDrawer}
            style={{ fontSize: 23, color: 'rgba(0,0,0,0.7)' }}
          />
        </Tooltip>
      </div>
      <Dropdown
        trigger={['click']}
        overlay={
          <Suspense fallback={<Loading />}>
            <DropDown />
          </Suspense>
        }
      >
        <div style={{ display: 'flex', cursor: 'pointer' }}>
          <Avatar src={public_user_info.photo} size={'large'} />
          <div
            style={{
              marginLeft: 10,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: 'rgba(0,0,0,0.7)',
              }}
            >{`${public_user_info.firstName} ${public_user_info.lastName}`}</span>
            <br />
            <span
              style={{
                color: 'rgba(0,0,0,0.7)',
              }}
            >
              {public_user_info.role.name}
            </span>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};
