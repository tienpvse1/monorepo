/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  AlertOutlined,
  BranchesOutlined,
  CalendarOutlined,
  ContactsOutlined,
  CopyOutlined,
  CrownOutlined,
  FieldTimeOutlined,
  FundOutlined,
  GlobalOutlined,
  LineChartOutlined,
  PercentageOutlined,
  SketchOutlined,
  SolutionOutlined,
  // TagOutlined,
  UserDeleteOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useAccountById } from '@modules/account/get/account.get';
import { Menu } from 'antd';
import { ReactNode } from 'react';
import { useCookies } from 'react-cookie';
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

  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);

  const { data: account } = useAccountById(id, false);

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
      key: 'lost-opportunities',
      label: 'Lost opportunity',
      style,
      onClick: () => navigate('/lost-opportunities'),
      icon: <UserDeleteOutlined style={style} />,
    },
    {
      key: 'renewal',
      label: 'Renewal',
      style,
      onClick: () => navigate('/renewal'),
      icon: <AlertOutlined style={style} />,
    },
    {
      key: 'product',
      label: 'Courses',
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
      key: 'discount',
      label: 'Discount codes',
      style,
      onClick: () => navigate('/discount'),
      icon: <PercentageOutlined style={style} />,
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
    // {
    //   key: 'tag',
    //   label: 'Tags',
    //   style,
    //   onClick: () => navigate('/tag'),
    //   icon: <TagOutlined style={style} />,
    // },
    {
      key: 'rank',
      label: 'Rank',
      style,
      onClick: () => navigate('/rank'),
      icon: <SketchOutlined style={style} />,
    },
  ];

  const leaderMenuItems: MenuProp[] = [
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
      key: 'lost-opportunities',
      label: 'Lost opportunity',
      style,
      onClick: () => navigate('/lost-opportunities'),
      icon: <UserDeleteOutlined style={style} />,
    },
    {
      key: 'renewal',
      label: 'Renewal',
      style,
      onClick: () => navigate('/Renewal'),
      icon: <AlertOutlined style={style} />,
    },
    {
      key: 'product',
      label: 'Courses',
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
      key: 'discount',
      label: 'Discount codes',
      style,
      onClick: () => navigate('/discount'),
      icon: <PercentageOutlined style={style} />,
    },
    {
      key: 'assign-task',
      label: 'Assign task',
      style,
      onClick: () => navigate('/assign-task'),
      icon: <CopyOutlined style={style} />,
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
    // {
    //   key: 'tag',
    //   label: 'Tags',
    //   style,
    //   onClick: () => navigate('/tag'),
    //   icon: <TagOutlined style={style} />,
    // },
    {
      key: 'rank',
      label: 'Rank',
      style,
      onClick: () => navigate('/rank'),
      icon: <SketchOutlined style={style} />,
    },
  ];

  return (
    <>
      {account && account.isLeader ? (
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
          {leaderMenuItems.map((item) => (
            <Menu.Item {...item}>{item.label}</Menu.Item>
          ))}
        </Menu>
      ) : (
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
      )}
    </>
  );
};
