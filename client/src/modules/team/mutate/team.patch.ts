import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { ITeam } from '../entity/team.entity';

const { TEAM } = controllers;
export const updateTeam = async (team: ITeam[]) => {
  const { data } = await instance.patch(TEAM, team);
  return data;
};

export const useUpdateTeam = () => useMutation(updateTeam);
