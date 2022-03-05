import { lazy, Suspense, useState } from 'react';
import {
  BellOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
const DropDown = lazy(() => import('@components/header/dropdown'));
import HeaderDrawer from '@components/header/header-drawer';
import { Loading } from '@components/loading/loading';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Avatar, Dropdown, Tooltip } from 'antd';
import { useCookies } from 'react-cookie';

export const HeaderApp = () => {
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => setShowDrawer(!showDrawer);

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
          <BellOutlined style={{ fontSize: 23, color: 'rgba(0,0,0,0.7)' }} />
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
