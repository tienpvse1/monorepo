import axios from 'axios';
import { useMutation } from 'react-query';

interface SystemModule {
  id: number;
  name: string;
  urL_LOGIN_BE?: any;
  urL_DISABLE_BE?: any;
  urL_FE?: any;
  imageName?: any;
  description?: any;
  isActive: boolean;
}

export interface ICourseAuthResult {
  access_token: string;
  token_type: string;
  userId: string;
  username: string;
  expires_in: number;
  role: string[];
  systemModules: SystemModule[];
}
export const authService = async (dto: {
  username: string;
  password: string;
}) => {
  const { data } = await axios.post<ICourseAuthResult>(
    'http://smapi.hisoft.vn/api/users/login',
    dto
  );
  return data;
};

export const useCourseServiceAuth = () => useMutation(authService);
