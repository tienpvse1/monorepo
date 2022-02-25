import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IPipelineItem } from '../entity/pipeline-items.entity';

const { PIPELINE_ITEM } = controllers;
export const GET_PIPELINE_ITEM_BY_ID = 'get-pipeline-item-by-id';
export const getPipelineId = async (id: string) => {
  const queryBuilder = RequestQueryBuilder.create({
    join: [
      { field: 'addresses' },
      { field: 'noteWorthies' },
      { field: 'pipelineColumn' },
    ],
    filter: [
      {
        field: 'id',
        operator: '$eq',
        value: id,
      },
    ],
  }).query(false);

  const { data } = await instance.get<IPipelineItem[]>(
    `${PIPELINE_ITEM}?${queryBuilder}`
  );
  return data[0];
};

export const usePipelineItem = (id: string) =>
  useQuery([GET_PIPELINE_ITEM_BY_ID, id], () => getPipelineId(id), {
    suspense: true,
  });
