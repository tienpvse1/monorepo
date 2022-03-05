import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { useMutation } from 'react-query';
import {
  IChangeStageDto,
  IUpdatePipelineItemDto,
} from '../dto/update-pipeline-items.dto';

const { PIPELINE_ITEM } = controllers;

const updatePipelineItem = async (
  id: string,
  updateDto: IUpdatePipelineItemDto
) => {
  console.log('🚀 ~ file: pipeline-items.update.ts ~ line 16 ~ id', id);
  const { data } = await instance.patch(`${PIPELINE_ITEM}/${id}`, updateDto);
  return data;
};

const changeOpportunityStage = async (
  id: string,
  changeStageDto: IChangeStageDto
) => {
  const { data } = await instance.patch<IPipelineColumn>(
    `${PIPELINE_ITEM}/change-stage/${id}`,
    changeStageDto
  );
  return data;
};

export const useUpdatePipelineItem = () =>
  useMutation(({ id, ...rest }: IUpdatePipelineItemDto & { id: string }) =>
    updatePipelineItem(id, rest)
  );

export const useChangeStage = () =>
  useMutation(({ id, ...rest }: IChangeStageDto & { id: string }) =>
    changeOpportunityStage(id, rest)
  );