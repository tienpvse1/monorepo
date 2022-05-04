import {
  AppstoreOutlined,
  BranchesOutlined,
  CarryOutOutlined,
  // CoffeeOutlined,
  MailOutlined,
  TagsOutlined,
  // SettingOutlined,
  // SketchOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuSiderAdminProps {
  style: object;
}

export const AdminMenuSider = ({ style }: MenuSiderAdminProps) => {
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
          key=''
          style={style}
          icon={<TeamOutlined style={style} />}
          onClick={() => navigate('/administration/')}
        >
          Account
        </Menu.Item>
        <Menu.Item
          key='activity'
          style={style}
          icon={<CarryOutOutlined style={style} />}
          onClick={() => navigate('/administration/activity')}
        >
          Activity Type
        </Menu.Item>

        <Menu.Item
          key='pipeline'
          style={style}
          onClick={() => navigate('/administration/pipeline')}
          icon={<BranchesOutlined style={style} />}
        >
          Pipeline
        </Menu.Item>

        <Menu.Item
          key='contact-tags'
          style={style}
          onClick={() => navigate('/administration/contact-tags')}
          icon={<TagsOutlined style={style} />}
        >
          Contact Tags
        </Menu.Item>

        {/* <Menu.Item
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
        </Menu.Item> */}
        <Menu.Item
          key='email'
          style={style}
          onClick={() => navigate('/administration/email')}
          icon={<MailOutlined style={style} />}
        >
          Email
        </Menu.Item>
      </Menu>
    </>
  );
};
