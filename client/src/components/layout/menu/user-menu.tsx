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
import { Reorder } from 'framer-motion';
import { ReorderGroup } from 'framer-motion/types/components/Reorder/Group';
import { ReactNode, useState } from 'react';
const { SubMenu } = Menu;
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuSiderUserProps {
  style: object;
}

interface MenuProp {
  key: string;
  label: string;
  style: object;
  onClick: () => any;
  icon: ReactNode;
}

export const MenuSiderUser = ({ style }: MenuSiderUserProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems: MenuProp[] = [
    {
      key: 'home',
      label: 'Home',
      style,
      onClick: () => navigate('/'),
      icon: <FundOutlined style={style} />,
    },
    {
      key: 'pipeline',
      label: 'Pipeline',
      style,
      onClick: () => navigate('/pipeline'),
      icon: <BranchesOutlined style={style} />,
    },
    {
      key: 'company',
      label: 'Company',
      style,
      onClick: () => navigate('/company'),
      icon: <SolutionOutlined style={style} />,
    },
    {
      key: 'contact',
      label: 'Contact',
      style,
      onClick: () => navigate('/contact'),
      icon: <ContactsOutlined style={style} />,
    },
    {
      key: 'opportunities',
      label: 'Opportunities',
      style,
      onClick: () => navigate('/opportunities'),
      icon: <CrownOutlined style={style} />,
    },
    {
      key: 'product',
      label: 'Product',
      style,
      onClick: () => navigate('/product'),
      icon: <WalletOutlined style={style} />,
    },
    {
      key: 'customer',
      label: 'Customer',
      style,
      onClick: () => navigate('/customer'),
      icon: <UserOutlined style={style} />,
    },
    {
      key: 'schedule',
      label:'Schedule',
      style,
      onClick: () => navigate('/schedule'),
      icon: <CalendarOutlined style={style} />,
    },
  ];

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
        {menuItems.map((item) => (
          <Menu.Item {...item}>{item.label}</Menu.Item>
        ))}

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
