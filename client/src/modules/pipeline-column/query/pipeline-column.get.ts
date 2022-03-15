import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IPipelineColumn } from '../entity/pipeline-column.entity';

const { PIPELINE_COLUMN } = controllers;
export const GET_STAGES_BY_PIPELINE_ID = 'get-stages-by-pipeline-id';
export const GET_STAGES_INFO = 'get-stages-info';
export const GET_MY_STAGES = 'get-my-stages';
export const getStages = async () => {
  const query = RequestQueryBuilder.create({
    join: [
      {
        field: 'pipelineItems',
      },
    ],
  }).query(false);
  const { data } = await instance.get<IPipelineColumn[]>(
    `${PIPELINE_COLUMN}?${query}`
  );

  return data.sort((a, b) => a.index - b.index);
};
export const getMyStages = async (accountId: string) => {
  const query = RequestQueryBuilder.create({
    join: [
      {
        field: 'pipelineItems',
      },
      {
        field: 'pipelineItems.account',
      },
    ],
    filter: [
      {
        field: 'pipelineItems.account.id',
        operator: '$eq',
        value: accountId,
      },
    ],
  }).query(false);
  const { data } = await instance.get<IPipelineColumn[]>(
    `${PIPELINE_COLUMN}?${query}`
  );

  return data.sort((a, b) => a.index - b.index);
};

export const getStagesInfo = async () => {
  const { data } = await instance.get<IPipelineColumn[]>(`${PIPELINE_COLUMN}`);

  return data.sort((a, b) => a.index - b.index);
};

export const useStages = () =>
  useQuery([GET_STAGES_BY_PIPELINE_ID], getStages, {
    suspense: true,
  });

export const useQueryStagesInfo = () =>
  useQuery([GET_STAGES_INFO], getStagesInfo, {
    suspense: true
  })
export const useMyStages = (accountId: string) =>
  useQuery([GET_MY_STAGES, accountId], () => getMyStages(accountId), {
    retry: false,
    enabled: Boolean(accountId),
  });
