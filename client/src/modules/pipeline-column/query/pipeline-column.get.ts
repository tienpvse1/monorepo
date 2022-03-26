import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { abstractSort } from '@util/array';
import { useQuery } from 'react-query';
import { IPipelineColumn } from '../entity/pipeline-column.entity';

const { PIPELINE_COLUMN } = controllers;
export const GET_STAGES = 'get-stages';
export const GET_STAGES_INFO = 'get-stages-info';
export const GET_MY_STAGES = 'get-my-stages';

export const getStages = async () => {
  const query = RequestQueryBuilder.create({
    join: [
      {
        field: 'pipelineItems',
      },
      {
        field: 'pipelineItems.schedules',
      },
      {
        field: 'pipelineItems.contact',
      },
      {
        field: 'pipelineItems.account',
      },
    ],
  }).query(false);
  const { data } = await instance.get<IPipelineColumn[]>(
    `${PIPELINE_COLUMN}?${query}`
  );
  for (const column of data) {
    //@ts-ignore
    column.pipelineItems = column.pipelineItems.filter((item) => !item.isLose);
  }
  abstractSort(data, 'pipelineItems');
  return data;
};
export const getMyStages = async (accountId: string) => {
  const query = RequestQueryBuilder.create({
    join: [
      {
        field: 'pipelineItems',
      },
      {
        field: 'pipelineItems.contact',
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
  useQuery([GET_STAGES], getStages, {
    suspense: true,
  });

export const useQueryStagesInfo = () =>
  useQuery([GET_STAGES_INFO], getStagesInfo, {
    suspense: true,
  });
export const useMyStages = (accountId: string) =>
  useQuery([GET_MY_STAGES, accountId], () => getMyStages(accountId), {
    retry: false,
    enabled: Boolean(accountId),
  });
