import { UserSideMenu } from '@components/layout/menu/user-menu';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Role } from '@interfaces/type-roles';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from './layout';

const LayoutUser = () => {
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  
  if (!public_user_info) return <Navigate to={'/login'} />;

  if (!public_user_info.role) return <Navigate to={'/login'} />;

  if (public_user_info?.role.name === `${Role.ADMIN}`)
    return <Navigate to={'/administration'} />;

  if (public_user_info?.role.name === `${Role.SALE_MANAGER}`)
    return <Navigate to={'/sale-manager'} />;

  return (
    <AppLayout
      content={<Outlet />}
      menuSider={<UserSideMenu style={{ fontSize: 17 }} />}
    />
  );
};
export default LayoutUser;
