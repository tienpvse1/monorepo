import { QuestionCircleOutlined } from '@ant-design/icons';
import { Badge, Menu, Space } from 'antd';
import { DropdownNotify } from './menu-notify';
import { DropdownProfile } from './menu-profile';

export const MenuHeader = () => {
  return (
    <Space size='small'>
      <Menu style={{ height: '60px', border: 'none' }} mode='horizontal'>
        <Menu.Item key='question'>
          <QuestionCircleOutlined
            style={{ fontSize: '20px', color: 'rgba(0,0,0,0.8)' }}
          />
        </Menu.Item>

        <Menu.Item key='message'>
          <Badge count={5}>
            <DropdownNotify />
          </Badge>
        </Menu.Item>

        <Menu.Item className='title-dropdown-profile' key='profile'>
          <DropdownProfile />
        </Menu.Item>
      </Menu>
    </Space>
  );
};
