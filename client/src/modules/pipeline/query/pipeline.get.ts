import { Axios } from '@axios';
import { useQuery } from 'react-query';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { controllers } from '@constance/controllers';
import { db } from '@db/db';
const { PIPELINE } = controllers;

export const getPipelineUser = async () => {
  const { instance } = new Axios();
  const { data } = await instance.get<IPipeline>(`${PIPELINE}/own`);
  db.pipeline.add({
    id: data.id,
    name: data.name,
  });
  return data;
};

export const useGetPipeLineUser = () => {
  const { data } = useQuery(PIPELINE, getPipelineUser);
  return { data };
};
