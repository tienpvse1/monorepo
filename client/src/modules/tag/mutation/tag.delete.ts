import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';

const { TAG } = controllers;

const deleteTag = async (id: string) => {
  const { data } = await instance.delete(`${TAG}/${id}`);
  return data;
};

export const useDeleteTag = () => useMutation(deleteTag);
