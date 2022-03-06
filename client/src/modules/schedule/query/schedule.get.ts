import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { queryWithIdProps } from '@modules/base/base.handler';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery, UseQueryResult } from 'react-query';
import { ISchedule } from '../entity/schedule.entity';

const { SCHEDULE } = controllers;
export const QUERY_SCHEDULES = 'query-schedules';
const getMySchedules = async (id: string, pipelineItemId: string) => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'account' }, { field: 'pipelineItem' }],
    filter: [
      {
        field: 'account.id',
        operator: '$eq',
        value: id,
      },
      {
        field: 'pipelineItem.id',
        operator: '$eq',
        value: pipelineItemId,
      },
    ],
  }).query(false);
  const { data } = await instance.get<ISchedule[]>(`${SCHEDULE}?${query}`);
  return data;
};

export const useSchedules = (
  accountId: string,
  pipelineItemId: string
): UseQueryResult<ISchedule[], any> =>
  useQuery(
    [QUERY_SCHEDULES, accountId],
    () => getMySchedules(accountId, pipelineItemId),
    {
      ...queryWithIdProps(accountId),
    }
  );
