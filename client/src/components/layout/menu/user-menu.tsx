/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  BranchesOutlined,
  CalendarOutlined,
  ContactsOutlined,
  CrownOutlined,
  FieldTimeOutlined,
  FundOutlined,
  GlobalOutlined,
  LineChartOutlined,
  SolutionOutlined,
  TagOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuSiderUserProps {
  style: object;
}

interface MenuProp {
  key: string;
  label: ReactNode;
  style: object;
  onClick: () => any;
  icon: ReactNode;
}

export const UserSideMenu = ({ style }: MenuSiderUserProps) => {
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
      key: 'forecast',
      label: 'Forecast',
      style,
      onClick: () => navigate('/forecast'),
      icon: <FieldTimeOutlined style={style} />,
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
      key: 'schedule',
      label: 'Schedule',
      style,
      onClick: () => navigate('/schedule'),
      icon: <CalendarOutlined style={style} />,
    },
    {
      key: 'statistic',
      label: 'Statistic',
      style,
      onClick: () => navigate('/statistic'),
      icon: <LineChartOutlined style={style} />,
    },
    {
      key: 'map-statistic',
      label: 'Geographic statistic',
      style,
      onClick: () => navigate('/map-statistic'),
      icon: <GlobalOutlined style={style} />,
    },
    {
      key: 'email',
      label: 'Email',
      style,
      onClick: () => navigate('/email'),
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
    {
      key: 'tag',
      label: 'Tags',
      style,
      onClick: () => navigate('/tag'),
      icon: <TagOutlined style={style} />,
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
      </Menu>
    </>
  );
};
