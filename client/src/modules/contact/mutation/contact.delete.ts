import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';

const { CONTACT } = controllers;

const deleteContact = async (id: string) => {
  const { data } = await instance.delete(`${CONTACT}/${id}`);
  return data;
};

export const useDeleteContact = (onSuccess: any) =>
  useMutation(deleteContact, {
    onSuccess,
  });
