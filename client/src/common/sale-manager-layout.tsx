import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Role } from '@interfaces/type-roles';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from './layout';
import { SaleManagerMenu } from './sale-manager-menu';

const SaleManagerLayout = () => {
  const [cookies] = useCookies([PUBLIC_USER_INFO]);
  if (!cookies.public_user_info) return <Navigate to={'/login'} />;
  if (cookies.public_user_info?.role.name !== Role.SALE_MANAGER)
    throw new Error('Unauthorize');

  return <AppLayout content={<Outlet />} menuSider={<SaleManagerMenu />} />;
};

export default SaleManagerLayout;
