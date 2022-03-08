import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { handleMutationResponse } from "@modules/base/base.handler";
import { GET_PIPELINE_DESIGN } from "@modules/pipeline/query/pipeline.get";
import { useMutation } from "react-query";
import { ICreatePipelineColumnDto } from "../dto/create-pipeline-column.dto"
const { PIPELINE_COLUMN } = controllers;


export const actionPatchPipelineColumn = async (pipelineColumn: ICreatePipelineColumnDto) => {
  const { instance } = new Axios();
  const { data } = await instance.patch(`${PIPELINE_COLUMN}/${pipelineColumn.pipelineId}`, { ...pipelineColumn });

  return data;
}

export const useUpdatePipelineColumn = () => {
  const { mutate, ...rest } = useMutation(actionPatchPipelineColumn,
    {
      ...handleMutationResponse(GET_PIPELINE_DESIGN)
    }
  );

  const updatePipelineColumn = (pipelineColumn: ICreatePipelineColumnDto) => {
    mutate(pipelineColumn);
  }

  return { updatePipelineColumn, ...rest };
}