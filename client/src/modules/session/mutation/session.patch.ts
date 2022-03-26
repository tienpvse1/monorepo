import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { IUpdateSessionDto } from '../dto/update-session.dto';
import { ISession } from '../entity/session.entity';
const { SESSION } = controllers;
export const updateSession = async (dto: IUpdateSessionDto) => {
  const { data } = await instance.patch<ISession>(SESSION, dto);
  return data;
};

export const useUpdateSession = () => useMutation(updateSession, { retry: 1 });
