import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { useMutation, useQueryClient } from "react-query";
import { ICreatePipelineItemsDto } from "../dto/create-pipeline-items.dto";

const {PIPELINE_ITEM, PIPELINE} = controllers;

export const postPipelineItems = async (pipelineItems: ICreatePipelineItemsDto) => {
  const { instance } = new Axios();
  const { data } = await instance.post(PIPELINE_ITEM, { ...pipelineItems });

  return data;
}

export const usePipelineItems = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(postPipelineItems,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PIPELINE);
      },
      onError: () => console.log('add pipeline items failed!')
    }
  );

  const createPipelineItems = (pipelineItems: ICreatePipelineItemsDto) => {
    mutate(pipelineItems);
  }

  return { createPipelineItems, isLoading };
}