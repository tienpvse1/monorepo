import { MenuSiderAdmin } from '@components/layout/menu/admin-menu';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Role } from '@interfaces/type-roles';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from './layout';

const LayoutAdmin = () => {
  const [cookies] = useCookies([PUBLIC_USER_INFO]);
  if (!cookies.public_user_info) return <Navigate to={'/login'} />;
  if (cookies.public_user_info?.role.name !== Role.ADMIN)
    throw new Error('Unauthorize');

  return (
    <AppLayout
      content={<Outlet />}
      menuSider={<MenuSiderAdmin style={{ fontSize: 17 }} />}
    />
  );
};

export default LayoutAdmin;
