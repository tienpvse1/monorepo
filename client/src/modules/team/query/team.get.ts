import { instance } from '@axios';
import { controllers } from '@constance/controllers';
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
        field: 'accounts.pipelineItems'
      }
    ],
  }).query(false);

  const { data } = await instance.get<ITeam[]>(`${TEAM}?${query}`);
  sortTeams(data);
  return data;
};

export const useTeams = () => useQuery([QUERY_TEAM], getTeams);
