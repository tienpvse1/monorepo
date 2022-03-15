import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Role } from '@interfaces/type-roles';
import { useCookies } from 'react-cookie';

interface HasRoleProps {
  role: Role;
}

export const HasRole: React.FC<HasRoleProps> = ({ role, children }) => {
  const [
    {
      public_user_info: {
        role: { name },
      },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  return <>{role === name && children}</>;
};
