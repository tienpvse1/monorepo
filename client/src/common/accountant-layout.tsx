import { AccountantMenuSider } from '@components/layout/menu/accountant-menu';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Role } from '@interfaces/type-roles';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from './layout';

const AccountantLayout = () => {
  const [cookies] = useCookies([PUBLIC_USER_INFO]);
  if (!cookies.public_user_info) return <Navigate to={'/login'} />;
  if (cookies.public_user_info?.role.name !== Role.ACCOUNTANT)
    throw new Error('Unauthorize');

  return (
    <AppLayout
      content={<Outlet />}
      menuSider={<AccountantMenuSider style={{ fontSize: 17 }} />}
    />
  );
};

export default AccountantLayout;
