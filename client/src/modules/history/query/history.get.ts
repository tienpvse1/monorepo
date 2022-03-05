import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IHistory } from '../entity/history.entity';

const { HISTORY } = controllers;
export const QUERY_HISTORIES = 'query-histories';
export const getHistory = async (accountId: string) => {
  const query = RequestQueryBuilder.create({
    search: {
      $and: [{ name: { $notnull: true } }, { 'account.id': accountId }],
    },
    join: ['account'],
    sort: [{ field: 'createdAt', order: 'DESC' }],
  }).query(false);
  const { data } = await instance.get<IHistory[]>(`${HISTORY}?${query}`);
  return data;
};

export const useHistory = (accountId: string) =>
  useQuery([QUERY_HISTORIES, accountId], () => getHistory(accountId), {
    enabled: Boolean(accountId),
    suspense: true,
  });
