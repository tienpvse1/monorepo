import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { handleMutationResponse } from "@modules/base/base.handler";
import { GET_PIPELINE_DESIGN } from "@modules/pipeline/query/pipeline.get";
import { useMutation } from "react-query";
import { ICreatePipelineColumnDto } from "../dto/create-pipeline-column.dto"

const { PIPELINE_COLUMN } = controllers;

export const postPipelineColumn = async ({ ...value }: ICreatePipelineColumnDto) => {
  const { instance } = new Axios();
  const { data } = await instance.post(PIPELINE_COLUMN, { ...value });

  return data;
}

export const usePostPipelineColumn = () => {
  const { mutate, ...rest } = useMutation(postPipelineColumn,
    {
      ...handleMutationResponse(GET_PIPELINE_DESIGN)
    }
  );

  const createPipelineColumn = (pipelineColumn: ICreatePipelineColumnDto) => {
    mutate(pipelineColumn);
  }

  return { createPipelineColumn, ...rest };
}