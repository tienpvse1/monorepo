import { Axios } from '@axios';
import { controllers } from '../../../constance/controllers';
import { setToken } from '../../../cookies';
import { IAuthDto } from '../dto/auth.dto';
import { IAuth } from '../entity/auth.entity';

const { AUTH } = controllers;
export const authenticateUser = async (authDto: IAuthDto) => {
  const { instance } = new Axios();
  const { data } = await instance.post<IAuth>(AUTH, {
    ...authDto,
  });
  setToken(data.token);
  return data;
};
