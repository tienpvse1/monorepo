import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { useMutation } from "react-query";
import { IPipeline } from "../entity/pipeline.entity";
import { handleMutationResponse } from "@modules/base/base.handler";
const { PIPELINE } = controllers;


export const actionPutPipeline = async ({ id, infoChangeStage, ...rest }: IPipeline) => {
  const { instance } = new Axios();
  const { data } = await instance.put(`${PIPELINE}/${id}`, { ...rest });

  return data;
}

export const useUpdatePipeline = () => {
  const { mutate, ...rest } = useMutation(actionPutPipeline,
    {
      ...handleMutationResponse()
    }
  );

  const updatePipeline = (pipeline: IPipeline) => {
    mutate(pipeline);
  }

  return { updatePipeline, ...rest };
}