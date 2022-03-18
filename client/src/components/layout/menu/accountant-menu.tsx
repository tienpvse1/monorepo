/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  BranchesOutlined,
  CalendarOutlined,
  CrownOutlined,
  FieldTimeOutlined,
  FundOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AccountantMenuSiderProps {
  style: object;
}

interface MenuProp {
  key: string;
  label: ReactNode;
  style: object;
  onClick: () => any;
  icon: ReactNode;
}

export const AccountantMenuSider = ({ style }: AccountantMenuSiderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems: MenuProp[] = [
    {
      key: 'home',
      label: 'Home',
      style,
      onClick: () => navigate('/accountant'),
      icon: <FundOutlined style={style} />,
    },
    {
      key: 'pipeline',
      label: 'Pipeline',
      style,
      onClick: () => navigate('/accountant/pipeline'),
      icon: <BranchesOutlined style={style} />,
    },
    {

      key: 'forecast',
      label: 'Forecast',
      style,
      onClick: () => navigate('/accountant/forecast'),
      icon: <FieldTimeOutlined style={style} />,
    },
    {
      key: 'opportunities',
      label: 'Opportunities',
      style,
      onClick: () => navigate('/accountant/opportunities'),
      icon: <CrownOutlined style={style} />,
    },
    {
      key: 'customer',
      label: 'Customer',
      style,
      onClick: () => navigate('/accountant/customer'),
      icon: <UserOutlined style={style} />,
    },
    {
      key: 'schedule',
      label: 'Schedule',
      style,
      onClick: () => navigate('/accountant/schedule'),
      icon: <CalendarOutlined style={style} />,
    },
    {
      key: 'email',
      label: 'Email',
      style,
      onClick: () => navigate('/accountant/email'),
      icon: (
        <img
          src={'https://cdn-icons-png.flaticon.com/512/732/732200.png'}
          height={20}
          width={20}
          style={{
            marginRight: 10,
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Menu
        defaultOpenKeys={['sub1']}
        // @ts-ignore
        selectedKeys={
          location.pathname.split('/')[2]?.length > 0
            ? location.pathname.split('/')[2]
            : 'home'
        }
        mode='inline'
      >
        {menuItems.map((item) => (
          <Menu.Item {...item}>{item.label}</Menu.Item>
        ))}
      </Menu>
    </>
  );
};
