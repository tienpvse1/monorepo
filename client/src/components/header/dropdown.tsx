import { ImportOutlined, UserOutlined } from '@ant-design/icons';
import { instance } from '@axios';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const DropDown = () => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    instance.post('auth/logout');
    navigate('/login');
  };
  return (
    <Menu>
      <Menu.Item key='1' onClick={handleProfileClick}>
        <UserOutlined /> <span>My profile</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='2' onClick={handleLogout}>
        <ImportOutlined /> <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
};

export default DropDown;
