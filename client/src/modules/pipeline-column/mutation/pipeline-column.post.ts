import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ICreatePipelineColumnDto } from "../dto/create-pipeline-column.dto"

const { PIPELINE_COLUMN, PIPELINE } = controllers;

export const postPipelineColumn = async ({ ...value }: ICreatePipelineColumnDto) => {
  const { instance } = new Axios();
  const { data } = await instance.post(PIPELINE_COLUMN, { ...value });

  return data;
}

export const usePostPipelineColumn = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(postPipelineColumn,
    {
      onSuccess: () => { queryClient.invalidateQueries(PIPELINE); },
      onError: () => { message.error('add pipeline column failed!') }
    }
  );

  const createPipelineColumn = (pipelineColumn: ICreatePipelineColumnDto) => {
    mutate(pipelineColumn);
  }

  return { createPipelineColumn, isLoading };
}