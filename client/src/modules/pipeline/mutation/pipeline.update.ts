import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { useMutation, useQueryClient } from "react-query";
import { IPipeline } from "../entity/pipeline.entity";
import { message } from "antd"
import { GET_PIPELINE_DESIGN } from "../query/pipeline.get";
const { PIPELINE } = controllers;


export const actionPutPipeline = async ({ id, ...rest }: IPipeline) => {
  const { instance } = new Axios();
  const { data } = await instance.put(`${PIPELINE}/${id}`, { ...rest });

  return data;
}

export const useUpdatePipeline = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(actionPutPipeline,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_PIPELINE_DESIGN);
      },
      onError: () => {
        message.error('Oops something went wrong!');
      }
    }
  );

  const updatePipeline = (pipeline: IPipeline) => {
    mutate(pipeline);
  }

  return { updatePipeline, isLoading, isError };
}