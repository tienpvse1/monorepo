import { Axios } from '@axios';
import { controllers } from '@constance/controllers';
import { handleMutationResponse } from '@modules/base/base.handler';
import { useMutation } from 'react-query';
import { ICreatePipelineItemsDto } from '../dto/create-pipeline-items.dto';

const { PIPELINE_ITEM } = controllers;

export const postPipelineItems = async (
  pipelineItems: ICreatePipelineItemsDto
) => {
  const { instance } = new Axios();
  const { data } = await instance.post(PIPELINE_ITEM, { ...pipelineItems });

  return data;
};

export const usePostPipelineItems = () =>
  useMutation(postPipelineItems, {
    ...handleMutationResponse(),
  });
