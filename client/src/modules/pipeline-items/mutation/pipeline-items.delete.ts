import { Axios } from '@axios';
import { controllers } from '@constance/controllers';
import { handleMutationResponse } from '@modules/base/base.handler';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { useMutation } from 'react-query';
const { PIPELINE_ITEM } = controllers;

export const deletePipelineItems = async (pipelineItemsId: string) => {
  const { instance } = new Axios();
  const { data } = await instance.delete(`${PIPELINE_ITEM}/${pipelineItemsId}`);

  return data;
};

export const useDeletePipelineItems = () => useMutation(deletePipelineItems,
  {
    ...handleMutationResponse(GET_PIPELINE_DESIGN)
  }
);
