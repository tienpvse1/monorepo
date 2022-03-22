import { Axios, instance } from '@axios';
import { controllers } from '@constance/controllers';
import { handleMutationResponse } from '@modules/base/base.handler';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { useMutation } from 'react-query';
import {
  ICreatePipelineItemForManager,
  ICreatePipelineItemsDto,
} from '../dto/create-pipeline-items.dto';
import { IPipelineItem } from '../entity/pipeline-items.entity';

const { PIPELINE_ITEM } = controllers;

export const postPipelineItems = async (
  pipelineItems: ICreatePipelineItemsDto
) => {
  const { instance } = new Axios();
  const { data } = await instance.post(PIPELINE_ITEM, { ...pipelineItems });

  return data;
};

export const createPipelineItemForManager = async (
  pipelineItem: ICreatePipelineItemForManager
) => {
  const { data } = await instance.post<IPipelineItem>(
    `${PIPELINE_ITEM}/manager`,
    pipelineItem
  );
  return data;
};

export const usePostPipelineItems = () =>
  useMutation(postPipelineItems, {
    ...handleMutationResponse(GET_PIPELINE_DESIGN),
  });
export const useCreatePipelineItemForManager = () =>
  useMutation(createPipelineItemForManager);
