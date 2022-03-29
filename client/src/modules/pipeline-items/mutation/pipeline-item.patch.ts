import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { IUpdateExpectedClosing } from '../dto/update-pipeline-items.dto';
import { IPipelineItem } from '../entity/pipeline-items.entity';
import { handleMutationResponse } from '@modules/base/base.handler';

export interface AssignAccountDto {
  id: string;
  accountId: string;
}
const { PIPELINE_ITEM } = controllers;
export const assignAccount = async (dto: AssignAccountDto) => {
  const { data } = await instance.patch(`${PIPELINE_ITEM}/assign`, dto);
  return data;
};

export const loseOpportunity = async ({ id }: { id: string }) => {
  const { data } = await instance.patch<IPipelineItem>(
    `${PIPELINE_ITEM}/lose/${id}`
  );
  return data;
};
export const restoreOpportunity = async ({ id }: { id: string }) => {
  const { data } = await instance.patch<IPipelineItem>(
    `${PIPELINE_ITEM}/restore/${id}`
  );
  return data;
};
export const updateExpectedClosing = async ({
  expectedClosing,
  id,
}: IUpdateExpectedClosing) => {
  const { data } = await instance.patch(`${PIPELINE_ITEM}/${id}`, {
    expectedClosing,
  });
  return data;
};

export const reassignAccount = async (dto: AssignAccountDto) => {
  const { data } = await instance.patch(`${PIPELINE_ITEM}/reassign`, dto);
  return data;
}

export const useReassignAccount = () => useMutation(reassignAccount, {
  ...handleMutationResponse()
});

export const useAssignAccount = () => useMutation(assignAccount);

export const useUpdateExpectedClosing = () =>
  useMutation(updateExpectedClosing);

export const useLoseOpportunity = () => useMutation(loseOpportunity);

export const useRestoreOpportunity = () => useMutation(restoreOpportunity);
