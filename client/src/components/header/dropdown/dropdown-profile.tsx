import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { PUBLIC_USER_INFO, SESSION_ID } from '@constance/cookie';
import { clearOutPermissions } from '@db/permission.db';
import { Menu } from 'antd';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const MenuProfile = () => {
  const navigate = useNavigate();
  const [_, __, removeCookie] = useCookies();
  const handleLogout = async () => {
    removeCookie(SESSION_ID);
    removeCookie(PUBLIC_USER_INFO);
    navigate('/login');
    await clearOutPermissions();
  };
  const handleNavigateProfile = () => {
    navigate('/account');
  };
  return (
    <Menu style={{ marginTop: '20px', borderRadius: '10px' }}>
      <Menu.Item key='profile' onClick={handleNavigateProfile}>
        <>
          <UserOutlined style={{ color: 'rgba(0,0,0,0.8)' }} />
          <span style={{ fontSize: '16px', color: 'rgba(0,0,0,0.8)' }}>
            My profile
          </span>
        </>
      </Menu.Item>
      {/* <Menu.Item key='setting' onClick={handleNavigateSetting}>
        <>
          <SettingOutlined style={{ color: 'rgba(0,0,0,0.8)' }} />
          <span style={{ fontSize: '16px', color: 'rgba(0,0,0,0.8)' }}>
            Settings
          </span>
        </>
      </Menu.Item> */}
      <Menu.Divider />
      <Menu.Item key='logout' onClick={handleLogout}>
        <LogoutOutlined style={{ color: 'rgba(0,0,0,0.8)' }} />
        <span style={{ fontSize: '16px', color: 'rgba(0,0,0,0.8)' }}>
          Log out
        </span>
      </Menu.Item>
    </Menu>
  );
};
