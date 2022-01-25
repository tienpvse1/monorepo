import {
  AppstoreOutlined,
  CoffeeOutlined,
  SettingOutlined,
  SketchOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuSiderAdminProps {
  style: object;
}

export const MenuSiderAdmin = ({ style }: MenuSiderAdminProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <>
      <Menu
        defaultOpenKeys={['sub1']}
        // @ts-ignore
        selectedKeys={
          location.pathname.split('/')[2]?.length > 0
            ? location.pathname.split('/')[2]
            : 'admin'
        }
        mode='inline'
      >
        <Menu.Item
          key='admin'
          style={style}
          onClick={() => navigate('/admin')}
          icon={<AppstoreOutlined style={style} />}
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          key='claims'
          style={style}
          icon={<SketchOutlined style={style} />}
        >
          Claims
        </Menu.Item>
        <Menu.Item
          key='biller'
          style={style}
          icon={<CoffeeOutlined style={style} />}
        >
          Biller Queue
        </Menu.Item>
        <Menu.Item
          key='subscription'
          style={style}
          icon={<SettingOutlined style={style} />}
        >
          Subscription
        </Menu.Item>
        <Menu.Item
          key='users'
          style={style}
          icon={<TeamOutlined style={style} />}
        >
          Users
        </Menu.Item>


      </Menu>
    </>
  );
};
