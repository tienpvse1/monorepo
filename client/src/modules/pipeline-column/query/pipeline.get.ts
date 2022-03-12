import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IPipelineColumn } from '../entity/pipeline-column.entity';

const { PIPELINE_COLUMN } = controllers;
export const GET_STAGES_BY_PIPELINE_ID = 'get-stages-by-pipeline-id';
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

export const useStages = () =>
  useQuery([GET_STAGES_BY_PIPELINE_ID], getStages, {
    suspense: true,
  });
