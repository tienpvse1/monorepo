import { Axios } from '@axios';
import { controllers } from '@constance/controllers';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { message } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
const { PIPELINE_ITEM, PIPELINE } = controllers;

export const deletePipelineItems = async (pipelineItemsId: string) => {
  const { instance } = new Axios();
  const { data } = await instance.delete(`${PIPELINE_ITEM}/${pipelineItemsId}`);

  return data;
};

export const useDeletePipelineItems = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deletePipelineItems, {
    onSuccess: () => {
      queryClient.refetchQueries(GET_PIPELINE_DESIGN);
    },
    onError: () => {
      message.error('delete pipeline items failed!');
    },
  });

  const removePipelineItems = (pipelineItemsId: string) => {
    mutate(pipelineItemsId);
  };

  return { removePipelineItems, isLoading };
};
