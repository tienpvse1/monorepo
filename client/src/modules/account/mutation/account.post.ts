import { instance } from '../../../axios';
import { controllers } from '../../../constance/controllers';
import { ICreateAccountDto } from '../dto/create-account.dto';
import { useMutation } from 'react-query';
const { ACCOUNT } = controllers;
export const createAccount = async (dto: ICreateAccountDto) => {
  const { data } = await instance.post(ACCOUNT, dto);
  return data;
};

export const useCreateAccount = () => useMutation(createAccount);
