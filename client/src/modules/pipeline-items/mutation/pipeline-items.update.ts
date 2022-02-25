import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { IUpdatePipelineItemDto } from '../dto/update-pipeline-items.dto';

const { PIPELINE_ITEM } = controllers;

const updatePipelineItem = async (
  id: string,
  updateDto: IUpdatePipelineItemDto
) => {
  const { data } = await instance.patch(`${PIPELINE_ITEM}/${id}`, updateDto);
  return data;
};

export const useUpdatePipelineItem = () =>
  useMutation(({ id, ...rest }: IUpdatePipelineItemDto & { id: string }) =>
    updatePipelineItem(id, rest)
  );
