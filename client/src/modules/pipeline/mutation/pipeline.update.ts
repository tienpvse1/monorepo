import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { useMutation, useQueryClient } from "react-query";
import { IPipeline } from "../entity/pipeline.entity";
import { message } from "antd"
const { PIPELINE } = controllers;


export const actionPutPipeline = async ({id, ...rest}: IPipeline) => {
  const { instance } = new Axios();  
  console.log(id);
  console.log({...rest});
  
  
  const { data } = await instance.put(`${PIPELINE}/${id}`, { ...rest });

  return data;
}

export const useUpdatePipeline = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(actionPutPipeline,
    {
      onSuccess: () => { queryClient.invalidateQueries(PIPELINE) },
      onError: () => { message.error('update pipeline failed!') }
    }
  );

  const updatePipeline = (pipeline: IPipeline) => {
    mutate(pipeline);
  }

  return { updatePipeline, isLoading };
}