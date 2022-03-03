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
      style,
      onClick: () => navigate('/'),
      icon: <FundOutlined style={style} />,
    },
    {
      key: 'pipeline',
      style,
      onClick: () => navigate('/pipeline'),
      icon: <BranchesOutlined style={style} />,
    },
    {
      key: 'leads',
      style,
      onClick: () => navigate('/leads'),
      icon: <SolutionOutlined style={style} />,
    },
    {
      key: 'contact',
      style,
      onClick: () => navigate('/contact'),
      icon: <ContactsOutlined style={style} />,
    },
    {
      key: 'opportunities',
      style,
      onClick: () => navigate('/opportunities'),
      icon: <CrownOutlined style={style} />,
    },
    {
      key: 'product',
      style,
      onClick: () => navigate('/product'),
      icon: <WalletOutlined style={style} />,
    },
    {
      key: 'customer',
      style,
      onClick: () => navigate('/customer'),
      icon: <UserOutlined style={style} />,
    },
    {
      key: 'schedule',
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
          <Menu.Item {...item}>{item.key}</Menu.Item>
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
