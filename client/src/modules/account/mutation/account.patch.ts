import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { IAccount } from '@interfaces/account';
import Account from '@pages/administration/account';
import { useMutation } from 'react-query';
import { IUpdateAccountDto } from '../dto/update-account.dto';

const { ACCOUNT } = controllers;
const updateAccount = async (id: string, updateDto: IUpdateAccountDto) => {
  const { data } = await instance.patch<IAccount>(
    `${ACCOUNT}/${id}`,
    updateDto
  );
  return data;
};

const changeState = async ({
  id,
  state,
}: {
  id: string;
  state: 'disable' | 'enable';
}) => {
  const { data } = await instance.patch(`${ACCOUNT}/${state}/${id}`);
  return data;
};

export const useUpdateAccount = () =>
  useMutation(
    ({ id, ...rest }: IUpdateAccountDto & { id: string }) =>
      updateAccount(id, rest),
    { retry: 3 }
  );

export const useChangeAccountState = () => useMutation(changeState);
