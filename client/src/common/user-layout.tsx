import { MenuSiderUser } from '@components/layout/menu/user-menu';
import { PUBLIC_USER_INFO, TOKEN } from '@constance/cookie';
import { getCookies } from '@cookies';
import { Role } from '@interfaces/type-roles';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { LayoutApp } from './layout';

export const LayoutUser = () => {

  const [cookies] = useCookies([PUBLIC_USER_INFO]);
  const token = getCookies(TOKEN);
  if (!token[0]) return <Navigate to={'/login'} />;
  // @ts-ignore
  if (!token[0].token) return <Navigate to={'/login'} />;

  if (cookies.public_user_info?.role === Role.ADMIN)
    return <Navigate to={'/admin'} />;


  return (
    <LayoutApp
      content={<Outlet />}
      menuSider={<MenuSiderUser style={{ fontSize: 17 }} />}
    />
  );
};
