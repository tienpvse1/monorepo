import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { Role } from '@interfaces/type-roles';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { sortTeams } from '@util/array';
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
      {
        field: 'accounts.pipelineItems',
      },
    ],
  }).query(false);

  const { data } = await instance.get<ITeam[]>(`${TEAM}?${query}`);
  sortTeams(data);
  return data;
};
export const getTeamsForManage = async () => {
  const query = RequestQueryBuilder.create({
    join: [
      {
        field: 'accounts',
      },
      {
        field: 'accounts.role',
      },
    ],
  }).query(false);

  const { data } = await instance.get<ITeam[]>(`${TEAM}?${query}`);
  console.log(data);

  sortTeams(data);
  const result = data.map((team) => ({
    ...team,
    accounts: team.accounts.filter(
      (item) => item.isEnable && item.role.name === Role.SALE
    ),
  }));
  return result;
};

export const useTeams = () => useQuery([QUERY_TEAM], getTeams);
