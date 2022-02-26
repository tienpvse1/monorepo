import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useQuery } from 'react-query';
import { IPipelineColumn } from '../entity/pipeline-column.entity';

const { PIPELINE_COLUMN } = controllers;
export const GET_STAGES_BY_PIPELINE_ID = 'get-stages-by-pipeline-id';
export const getStagesByPipelineId = async (pipelineId: string) => {
  const { data } = await instance.get<IPipelineColumn[]>(
    `${PIPELINE_COLUMN}/many/${pipelineId}`
  );

  return data.sort((b,a) => a.index - b.index);
};

export const useGetStagesByPipelineId = (id: string) =>
  useQuery([GET_STAGES_BY_PIPELINE_ID, id], () => getStagesByPipelineId(id), {
    suspense: true,
    enabled: Boolean(id),
  });
