import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
const { TEAM } = controllers;
export const postTeam = async (teamName: string) => {
  const { data } = await instance.post(TEAM, { name: teamName });
  return data;
};

export const useCreateTeam = () => useMutation(postTeam);
