import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { CreateDiscountCodeDto } from '../dto/create-discount-code.dto';

const { DISCOUNT_CODE } = controllers;

export interface UpdateDiscountCodeDto {
  id: string;
  dto: Partial<CreateDiscountCodeDto>;
}
export const updateDiscount = async ({ dto, id }: UpdateDiscountCodeDto) => {
  const { data } = await instance.put(`${DISCOUNT_CODE}/${id}`, dto);
  return data;
};

export const useUpdateDiscount = () => useMutation(updateDiscount);
