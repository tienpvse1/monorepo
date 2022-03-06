import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { ICreateScheduleDto } from '../dto/create-schedule.dto';
import { ISchedule } from '../entity/schedule.entity';

const { SCHEDULE } = controllers;
const createSchedule = async (dto: ICreateScheduleDto) => {
  const { data } = await instance.post<ISchedule>(SCHEDULE, dto);
  return data;
};

export const useCreateSchedule = () => useMutation(createSchedule);
