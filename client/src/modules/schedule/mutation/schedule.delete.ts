import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { IUpdateSchedule } from '../dto/update-schedule.dto';
const { SCHEDULE } = controllers;

const removeSchedule = async ({ id, isDone }: IUpdateSchedule) => {
  const { data } = await instance.patch(`${SCHEDULE}/${id}`, { isDone });
  return data;
};

export const useRemoveSchedule = () => useMutation(removeSchedule);
