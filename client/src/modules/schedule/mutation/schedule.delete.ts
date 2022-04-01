import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';

const { SCHEDULE } = controllers;
const removeSchedule = async (id: string) => {
  const { data } = await instance.delete(`${SCHEDULE}/${id}`);
  return data;
};

export const useRemoveSchedule = () => useMutation(removeSchedule);
