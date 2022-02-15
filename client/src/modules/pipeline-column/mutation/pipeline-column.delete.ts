import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { useMutation, useQueryClient } from "react-query";
const { PIPELINE_COLUMN, PIPELINE } = controllers;

export const actionDeletePipelineColumn = async (pipelineColumnId: string) => {
  const { instance } = new Axios();
  const { data } = await instance.delete(`${PIPELINE_COLUMN}/${pipelineColumnId}`);

  return data;
}

export const useDeletePipelineColumn = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(actionDeletePipelineColumn,
    {
      onSuccess: () => { queryClient.invalidateQueries(PIPELINE) },
      onError: () => console.log('delete pipeline column failed!')
    }
  );

  const deletePipelineColumn = (pipelineColumnId: string) => {
    mutate(pipelineColumnId);
  }

  return { deletePipelineColumn, isLoading };
}