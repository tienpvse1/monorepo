import { instance } from '../../../axios';
import { controllers } from '../../../constance/controllers';

const { ACCOUNT } = controllers;
export const createAccount = async () => {
  const { data } = await instance.post(ACCOUNT, {
    email: 'chuongtest@gmail.com',
    password: '0123456789',
  });
  return data;
};
