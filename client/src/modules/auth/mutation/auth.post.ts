import { noErrorInstance } from '@axios';
import { controllers } from '../../../constance/controllers';
import { IAuthDto } from '../dto/auth.dto';
import { IAuth } from '../entity/auth.entity';

const { AUTH } = controllers;
export const authenticateUser = async (authDto: IAuthDto) => {
  const { data } = await noErrorInstance.post<IAuth>(`${AUTH}/session`, {
    ...authDto,
  });
  return data;
};
