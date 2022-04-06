import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { ICreateActivityDto } from '../dto/create-activity.dto';
import { IActivityType } from '../entity/activity.entity';

const { ACTIVITY_TYPE } = controllers;
export const createActivityType = async (dto: ICreateActivityDto) => {
  const { data } = await instance.post<IActivityType>(ACTIVITY_TYPE, dto);
  return data;
};

export const useCreateActivityType = () => useMutation(createActivityType);
