import { MenuSiderUser } from '@components/layout/menu/user-menu';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Role } from '@interfaces/type-roles';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from './layout';

const LayoutUser = () => {
  const [cookies] = useCookies([PUBLIC_USER_INFO]);
  if (!cookies.public_user_info) return <Navigate to={'/login'} />;
  const { role } = cookies.public_user_info;

  if (!role) return <Navigate to={'/login'} />;
  if (cookies.public_user_info?.role === `${Role.ADMIN}`)
    return <Navigate to={'/administrator'} />;

  return (
    <AppLayout
      content={<Outlet />}
      menuSider={<MenuSiderUser style={{ fontSize: 17 }} />}
    />
  );
};
export default LayoutUser;
