import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';

export interface AssignAccountDto {
  id: string;
  accountId: string;
}
const { PIPELINE_ITEM } = controllers;
export const assignAccount = async (dto: AssignAccountDto) => {
  const { data } = await instance.patch(`${PIPELINE_ITEM}/assign`, dto);
  return data;
};

export const useAssignAccount = () => useMutation(assignAccount);
