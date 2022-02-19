import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { useMutation, useQueryClient } from "react-query";
import { IPipeline } from "../entity/pipeline.entity";
import { message } from "antd"
const { PIPELINE } = controllers;


export const actionPutPipeline = async ({ id, ...rest }: IPipeline) => {
  const { instance } = new Axios();
  const { data } = await instance.put(`${PIPELINE}/replace/${id}`, { ...rest });

  return data;
}

export const useUpdatePipeline = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(actionPutPipeline,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PIPELINE);
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