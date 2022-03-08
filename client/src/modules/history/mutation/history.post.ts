import { Axios } from "@axios";
import { controllers } from "@constance/controllers";
import { handleMutationResponse } from "@modules/base/base.handler";
import { useMutation } from "react-query";
import { ICreateHistory } from "../dto/create-history.dto";

const { HISTORY } = controllers;

export const postHistory = async ({ ...value }: ICreateHistory) => {
  const { instance } = new Axios();
  const { data } = await instance.post(HISTORY, { ...value });

  return data;
}

export const usePostHistory = () => {
  const { mutate, ...rest } = useMutation(postHistory,
    {
      ...handleMutationResponse('', () => {})
    }
  );

  const createHistory = (pipelineColumn: ICreateHistory) => {
    mutate(pipelineColumn);
  }

  return { createHistory, ...rest };
}