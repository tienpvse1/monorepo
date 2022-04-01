
import { useCookies } from 'react-cookie';
import { PUBLIC_USER_INFO } from '@constance/cookie';

export const useHandleNavigate = () => {
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  //navigate default user
  let navigateRole = '/'
  
  switch (public_user_info.role.name) {
    case 'sale_manager':
      navigateRole = '/sale-manager/'
      break;
    case 'admin':
      navigateRole = '/administration/'
      break;
  }

  return { navigateRole };
}