import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { handleMutationResponse } from "@modules/base/base.handler";
import { GET_PIPELINE_DESIGN } from "@modules/pipeline/query/pipeline.get";
import { useMutation } from "react-query";
const { PIPELINE_COLUMN } = controllers;

export const actionDeletePipelineColumn = async (pipelineColumnId: string) => {
  const { instance } = new Axios();
  const { data } = await instance.delete(`${PIPELINE_COLUMN}/${pipelineColumnId}`);

  return data;
}

export const useDeletePipelineColumn = () => {
  const { mutate, ...rest } = useMutation(actionDeletePipelineColumn,
    {
      ...handleMutationResponse(GET_PIPELINE_DESIGN)
    }
  );

  return { mutate, ...rest };
}