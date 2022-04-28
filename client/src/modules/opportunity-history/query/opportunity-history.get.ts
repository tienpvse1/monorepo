import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IOpportunityHistory } from '../entity/opportunity-history.entity';

const { OPPORTUNITY_HISTORY } = controllers;
export const QUERY_OPPORTUNITY_HISTORY = 'query-opportunity-history';
export const QUERY_OPPORTUNITY_HISTORY_WITH_ORDER =
  'query-opportunity-history-with-order';
const cleanData = (data: IOpportunityHistory[]) => {
  const result: IOpportunityHistory[] = [];
  for (const history of data) {
    const itemInResult = result.find(
      (item) => item.pipelineItem.id === history.pipelineItem?.id
    );
    if (!itemInResult) result.push(history);
  }
  return result;
};
export const getOpportunityHistoryForStatistic = async () => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'pipelineItem' }, { field: 'newStage' }],
    sort: [
      {
        field: 'pipelineItem.id',
        order: 'DESC',
      },
      {
        field: 'createdAt',
        order: 'DESC',
      },
    ],
  }).query();
  const { data } = await instance.get<IOpportunityHistory[]>(
    `${OPPORTUNITY_HISTORY}?${query}`
  );
  const result = cleanData(data);
  return result;
};
export const getOpportunityHistory = async (opportunityId: string) => {
  const query = RequestQueryBuilder.create({
    filter: [
      { field: 'pipelineItem.id', operator: '$eq', value: opportunityId },
    ],
    sort: [{ field: 'createdAt', order: 'DESC' }],
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

export const useOpportunityWithOrder = () =>
  useQuery(QUERY_OPPORTUNITY_HISTORY, getOpportunityHistoryForStatistic, {
    suspense: true,
  });
