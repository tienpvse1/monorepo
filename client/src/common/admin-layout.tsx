import { MenuSiderAdmin } from '@components/layout/menu/admin-menu';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Role } from '@interfaces/type-roles';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { LayoutApp } from './layout';

export const LayoutAdmin = () => {
  const [cookies] = useCookies([PUBLIC_USER_INFO]);
  if (!cookies.public_user_info) return <Navigate to={'/login'} />;
  if (cookies.public_user_info?.role !== Role.ADMIN)
    throw new Error('Unauthorize');

  return (
    <LayoutApp
      content={<Outlet />}
      menuSider={<MenuSiderAdmin style={{ fontSize: 17 }} />}
    />
  );
};
