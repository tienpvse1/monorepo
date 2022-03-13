import { lazy, Suspense, useEffect, useState } from 'react';
import {
  BellOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
const DropDown = lazy(() => import('@components/header/dropdown'));
import HeaderDrawer from '@components/header/header-drawer';
import { Loading } from '@components/loading/loading';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Avatar, Badge, Dropdown, Tooltip } from 'antd';
import { useCookies } from 'react-cookie';
import { io } from 'socket.io-client';
import { envVars } from '@env/var.env';
import { INotification } from '@modules/notification/entity/notification.entity';
import { getNotifications } from '@modules/notification/query/notification.get';
import { useUpdateSession } from '@modules/session/mutation/session.patch';
import { useSocket } from '@hooks/socket';
const socket = io(`${envVars.VITE_BE_DOMAIN}/notification`);
export const HeaderApp = () => {
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  const { mutate } = useUpdateSession();
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => setShowDrawer(!showDrawer);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  useEffect(() => {
    mutate({
      notificationId: socket.id,
    });
    getNotifications(public_user_info.id).then((data) =>
      setNotifications(data)
    );
  }, []);

  useSocket({
    event: 'send-notification',
    onReceive: (data: INotification) =>
      setNotifications((prev) => [...prev, data]),
    socket,
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
      <HeaderDrawer handleClose={toggleDrawer} visible={showDrawer} />
      <div
        style={{
          display: 'flex',
          gap: 25,
          marginRight: 20,
        }}
      >
        <Tooltip title='Notification'>
          <Badge
            count={notifications.filter((item) => item.seen === false).length}
          >
            <BellOutlined style={{ fontSize: 23, color: 'rgba(0,0,0,0.7)' }} />
          </Badge>
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
