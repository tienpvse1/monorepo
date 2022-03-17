import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IOpportunityHistory } from '../entity/opportunity-history.entity';

const { OPPORTUNITY_HISTORY } = controllers;
export const QUERY_OPPORTUNITY_HISTORY = 'query-opportunity-history';
export const getOpportunityHistory = async (opportunityId: string) => {
  const query = RequestQueryBuilder.create({
    filter: [
      { field: 'pipelineItem.id', operator: '$eq', value: opportunityId },
    ],
    join: ['pipelineItem'],
  }).query();
  const { data } = await instance.get<IOpportunityHistory[]>(
    `${OPPORTUNITY_HISTORY}?${query}`
  );
  return data;
};

export const useOpportunityHistory = (id: string) =>
  useQuery([QUERY_OPPORTUNITY_HISTORY, id], () => getOpportunityHistory(id), {
    enabled: Boolean(id),
  });
