import { Axios } from '@axios';
import { useQuery } from 'react-query';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';


export const FETCH_PIPELINE = 'fetch-pipeline';
export const PIPELINE = 'pipeline';

export const getPipelineUser = async () => {
  const { instance } = new Axios();
  const { data } = await instance.get<IPipeline[]>(PIPELINE);
  return data;
}

export const useGetPipeLineUser = () => {
  const { data } = useQuery(FETCH_PIPELINE, getPipelineUser)
  return { data };
}