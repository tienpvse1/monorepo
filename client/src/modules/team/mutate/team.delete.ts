import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
const { TEAM } = controllers;
export const deleteTeam = async (id: string) => {
  const { data } = await instance.delete(`${TEAM}/${id}`);
  return data;
};

export const useDeleteTeam = () => useMutation(deleteTeam);
