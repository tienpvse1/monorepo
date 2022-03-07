import { Axios } from '@axios';
import { useQuery } from 'react-query';
import { controllers } from '@constance/controllers';
import { IProduct } from '../entity/product.entity';
const { PRODUCT } = controllers;

export const getAllProduct = async () => {
  const { instance } = new Axios();
  const { data } = await instance.get<IProduct[]>(`${PRODUCT}`);
  return data;
};

export const useQueryProducts = () => useQuery(PRODUCT, getAllProduct);
