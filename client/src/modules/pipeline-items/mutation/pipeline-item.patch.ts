import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { IUpdateExpectedClosing } from '../dto/update-pipeline-items.dto';

export interface AssignAccountDto {
  id: string;
  accountId: string;
}
const { PIPELINE_ITEM } = controllers;
export const assignAccount = async (dto: AssignAccountDto) => {
  const { data } = await instance.patch(`${PIPELINE_ITEM}/assign`, dto);
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

export const useAssignAccount = () => useMutation(assignAccount);
export const useUpdateExpectedClosing = () =>
  useMutation(updateExpectedClosing);
