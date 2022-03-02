import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { GET_PIPELINE_DESIGN } from "@modules/pipeline/query/pipeline.get";
import { message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { ICreatePipelineColumnDto } from "../dto/create-pipeline-column.dto"
const { PIPELINE_COLUMN } = controllers;


export const actionPatchPipelineColumn = async (pipelineColumn: ICreatePipelineColumnDto) => {
  const { instance } = new Axios();
  const { data } = await instance.patch(`${PIPELINE_COLUMN}/${pipelineColumn.pipelineId}`, { ...pipelineColumn });

  return data;
}

export const useUpdatePipelineColumn = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(actionPatchPipelineColumn,
    {
      onSuccess: () => { queryClient.invalidateQueries(GET_PIPELINE_DESIGN) },
      onError: () => { message.error('update pipeline column name failed!') }
    }
  );

  const updatePipelineColumn = (pipelineColumn: ICreatePipelineColumnDto) => {
    mutate(pipelineColumn);
  }

  return { updatePipelineColumn, isLoading };
}