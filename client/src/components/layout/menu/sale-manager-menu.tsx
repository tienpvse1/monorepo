/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  BranchesOutlined,
  CalendarOutlined,
  ContactsOutlined,
  CrownOutlined,
  FieldTimeOutlined,
  FundOutlined,
  LineChartOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SaleManagerSiderProps {
  style: object;
}

interface MenuProp {
  key: string;
  label: ReactNode;
  style: object;
  onClick: () => any;
  icon: ReactNode;
}

export const SaleManagerMenuSider = ({ style }: SaleManagerSiderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems: MenuProp[] = [
    {
      key: 'home',
      label: 'Home',
      style,
      onClick: () => navigate('/sale-manager'),
      icon: <FundOutlined style={style} />,
    },
    {
      key: 'pipeline',
      label: 'Pipeline',
      style,
      onClick: () => navigate('/sale-manager/pipeline'),
      icon: <BranchesOutlined style={style} />,
    },
    {
      key: 'forecast',
      label: 'Forecast',
      style,
      onClick: () => navigate('/sale-manager/forecast'),
      icon: <FieldTimeOutlined style={style} />,
    },
    {
      key: 'company',
      label: 'Company',
      style,
      onClick: () => navigate('/sale-manager/company'),
      icon: <SolutionOutlined style={style} />,
    },
    {
      key: 'contact',
      label: 'Contact',
      style,
      onClick: () => navigate('/sale-manager/contact'),
      icon: <ContactsOutlined style={style} />,
    },
    {
      key: 'opportunities',
      label: 'Opportunities',
      style,
      onClick: () => navigate('/sale-manager/opportunities'),
      icon: <CrownOutlined style={style} />,
    },
    {
      key: 'sale-manage',
      label: 'Team',
      style,
      onClick: () => navigate('/sale-manager/sale-manage'),
      icon: <UserOutlined style={style} />,
    },
    {
      key: 'schedule',
      label: 'Schedule',
      style,
      onClick: () => navigate('/sale-manager/schedule'),
      icon: <CalendarOutlined style={style} />,
    },
    {
      key: 'statistic',
      label: 'Statistic',
      style,
      onClick: () => navigate('/sale-manager/statistic'),
      icon: <LineChartOutlined style={style} />,
    },
    {
      key: 'email',
      label: 'Email',
      style,
      onClick: () => navigate('/sale-manager/email'),
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
  ]

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
