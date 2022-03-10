import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { ITeam } from '../entity/team.entity';

const { TEAM } = controllers;
export const QUERY_TEAM = 'query-team';
export const getTeams = async () => {
  const query = RequestQueryBuilder.create({
    join: [
      {
        field: 'accounts',
      },
    ],
  }).query(false);

  const { data } = await instance.get<ITeam[]>(`${TEAM}?${query}`);
  data.forEach((team) => {
    if (team.accounts) {
      team.accounts.sort((a, b) => a.teamIndex - b.teamIndex);
    }
  });
  data.sort((a, b) => a.index - b.index);
  return data;
};

export const useTeams = () => useQuery([QUERY_TEAM], getTeams);
