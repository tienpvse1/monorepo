import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { useQuery } from 'react-query';
const { PIPELINE } = controllers;
export const GET_PIPELINE_DESIGN = 'get-pipeline-design';
export const getPipelineUser = async () => {
  const { data } = await instance.get<IPipeline>(`${PIPELINE}`);
  
  return data;
};

export const useGetPipeLineUser = () => {
  const { data, isLoading } = useQuery(GET_PIPELINE_DESIGN, getPipelineUser);
  return { data, isLoading };
};
