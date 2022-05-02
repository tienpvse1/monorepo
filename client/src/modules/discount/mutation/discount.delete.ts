import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';

const { DISCOUNT_CODE } = controllers;

export const deleteDiscount = async (id: string) => {
  const { data } = await instance.delete(`${DISCOUNT_CODE}/${id}`);
  return data;
};

export const useDeleteDiscountCode = () => useMutation(deleteDiscount);
