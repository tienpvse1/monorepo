import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { useMutation, useQueryClient } from "react-query";
import { IUpdatePipelineItemDto } from "../dto/update-pipeline-items.dto";

const {PIPELINE_ITEM, PIPELINE} = controllers;

export const patchPipelineItemsName = async (pipelineItems: IUpdatePipelineItemDto) => {
  const { instance } = new Axios();
  const { data } = await instance.patch(`${PIPELINE_ITEM}/${pipelineItems.id}`, { ...pipelineItems });

  return data;
}

export const useUpdatePipelineItems = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(patchPipelineItemsName,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PIPELINE);
      },
      onError: () => console.log('update pipeline items failed!')
    }
  );

  const updatePipelineItemsName = (pipelineItems: IUpdatePipelineItemDto) => {
    mutate(pipelineItems);
  }

  return { updatePipelineItemsName, isLoading };
}