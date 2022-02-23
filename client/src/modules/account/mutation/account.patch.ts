import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { IUpdateAccountDto } from '../dto/update-account.dto';

const { ACCOUNT } = controllers;
const updateAccount = async (id: string, updateDto: IUpdateAccountDto) => {
  const { data } = await instance.patch(`${ACCOUNT}/${id}`, updateDto);
  return data;
};
