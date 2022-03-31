import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IOpportunityRevenue } from '../entity/opportunity-revenue';

const { OPPORTUNITY_REVENUE } = controllers;
export const QUERY_MY_OPPORTUNITY_REVENUE = 'query-my-opportunity-revenue';
export const QUERY_OPPORTUNITY_REVENUE = 'query-opportunity-revenue';
export const getMyOpportunityRevenue = async (accountId: string) => {
  const query = RequestQueryBuilder.create({
    join: [
      { field: 'pipelineItem' },
      { field: 'pipelineItem.pipelineColumn' },
      { field: 'pipelineItem.account' },
    ],
    filter: [
      {
        field: 'pipelineItem.pipelineColumn.isWon',
        operator: '$eq',
        value: true,
      },
      {
        field: 'pipelineItem.account.id',
        operator: '$eq',
        value: accountId,
      },
    ],
  }).query(false);
  const { data } = await instance.get<IOpportunityRevenue[]>(
    `${OPPORTUNITY_REVENUE}?${query}`
  );
  return data;
};

export const getOpportunityRevenue = async () => {
  const query = RequestQueryBuilder.create({
    join: [
      { field: 'pipelineItem' },
      { field: 'pipelineItem.pipelineColumn' },
      { field: 'pipelineItem.account' },
    ],
    filter: [
      {
        field: 'pipelineItem.pipelineColumn.isWon',
        operator: '$eq',
        value: true,
      },
    ],
  }).query(false);
  const { data } = await instance.get<IOpportunityRevenue[]>(
    `${OPPORTUNITY_REVENUE}?${query}`
  );
  return data;
};

export const useMyOpportunityRevenue = (accountId: string) =>
  useQuery(
    [QUERY_MY_OPPORTUNITY_REVENUE, accountId],
    () => getMyOpportunityRevenue(accountId),
    {
      enabled: Boolean(accountId),
    }
  );
export const useOpportunityRevenue = (suspense = false) =>
  useQuery([QUERY_MY_OPPORTUNITY_REVENUE], getOpportunityRevenue, { suspense });
