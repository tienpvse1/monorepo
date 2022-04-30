import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { CreateDiscountCodeDto } from '../dto/create-discount-code.dto';
import { ICreateDiscountTemplate } from '../dto/create-discount-template.dto';

const { DISCOUNT_CODE } = controllers;

const createDiscountCode = async (dto: CreateDiscountCodeDto) => {
  const { data } = await instance.post(DISCOUNT_CODE, dto);
  return data;
};

const createDiscountCodeTemplate = async (dto: ICreateDiscountTemplate) => {
  const { data } = await instance.post(`${DISCOUNT_CODE}/template`, dto);
  return data;
};
export const useCreateDiscountCodeTemplate = () =>
  useMutation(createDiscountCodeTemplate);
export const useCreateDiscountCode = () => useMutation(createDiscountCode);
