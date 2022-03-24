import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { handleMutationResponse } from '@modules/base/base.handler';

const { COMPANY } = controllers;

const deleteCompany = async (id: string) => {
  const { data } = await instance.delete(`${COMPANY}/${id}`);
  return data;
};

export const useDeleteCompany = () =>
  useMutation(deleteCompany, {
    ...handleMutationResponse(),
  });
