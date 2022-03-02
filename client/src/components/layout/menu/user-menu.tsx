/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  BranchesOutlined,
  CalendarOutlined,
  CodeSandboxOutlined,
  ContactsOutlined,
  CrownOutlined,
  FundOutlined,
  PlusOutlined,
  SolutionOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { envVars } from '@env/var.env';
import { Menu } from 'antd';
const { SubMenu } = Menu;
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuSiderUserProps {
  style: object;
}

export const MenuSiderUser = ({ style }: MenuSiderUserProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Menu
        defaultOpenKeys={['sub1']}
        // @ts-ignore
        selectedKeys={
          location.pathname.split('/')[1].length > 0
            ? location.pathname.split('/')[1]
            : 'home'
        }
        mode='inline'
      >
        <Menu.Item
          key='home'
          style={style}
          onClick={() => navigate('/')}
          icon={<FundOutlined style={style} />}
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          key='pipeline'
          onClick={() => navigate('/pipeline')}
          style={style}
          icon={<BranchesOutlined style={style} />}
        >
          Pipeline
        </Menu.Item>

        <Menu.Item
          key='leads'
          onClick={() => navigate('/leads')}
          style={style}
          icon={<SolutionOutlined style={style} />}
        >
          Leads
        </Menu.Item>

        <Menu.Item
          key='contact'
          onClick={() => navigate('/contact')}
          style={style}
          icon={<ContactsOutlined style={style} />}
        >
          Contact
        </Menu.Item>

        <Menu.Item
          key='opportunities'
          onClick={() => navigate('/opportunities')}
          style={style}
          icon={<CrownOutlined style={style} />}
        >
          Opportunities
        </Menu.Item>

        <Menu.Item
          key='product'
          onClick={() => navigate('/product')}
          style={style}
          icon={<WalletOutlined style={style} />}
        >
          Product
        </Menu.Item>
        <Menu.Item
          key='customer'
          style={style}
          icon={<UserOutlined style={style} />}
        >
          Customer
        </Menu.Item>
        <Menu.Item
          key='schedule'
          style={style}
          icon={<CalendarOutlined style={style} />}
        >
          Schedule
        </Menu.Item>

        {/* ----------------------------------------------------------- */}
        <SubMenu
          key='sub1'
          title={
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'rgba(0,0,0,0.6)',
              }}
            >
              Integrations
            </div>
          }
          icon={<CodeSandboxOutlined style={style} />}
        >
          <Menu.Item key='slack' style={style}>
            <img
              src={`${envVars.VITE_BE_DOMAIN}/files/slack.png`}
              height={20}
              width={20}
              style={{
                marginRight: 10,
              }}
            />
            Slack
          </Menu.Item>

          <Menu.Item key='notion' style={style}>
            <img
              src={`${envVars.VITE_BE_DOMAIN}/files/notion.png`}
              height={20}
              width={20}
              style={{
                marginRight: 10,
              }}
            />
            Notion
          </Menu.Item>
          <Menu.Item key='googleDrive' style={style}>
            <img
              src={`${envVars.VITE_BE_DOMAIN}/files/google-drive.png`}
              height={20}
              width={20}
              style={{
                marginRight: 10,
              }}
            />
            Google drive
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate('/email')}
            key='email'
            style={style}
          >
            <img
              src={'https://cdn-icons-png.flaticon.com/512/732/732200.png'}
              height={20}
              width={20}
              style={{
                marginRight: 10,
              }}
            />
            Gmail
          </Menu.Item>
          <Menu.Item key='add' style={style}>
            <PlusOutlined
              width={20}
              style={{
                marginRight: 8,
              }}
            />
            Add plugin
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};
