import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { CreateDiscountCodeDto } from '../dto/create-discount-code.dto';

const { DISCOUNT_CODE } = controllers;

const createDiscountCode = async (dto: CreateDiscountCodeDto) => {
  const { data } = await instance.post(DISCOUNT_CODE, dto);
  return data;
};

export const useCreateDiscountCode = () => useMutation(createDiscountCode);
