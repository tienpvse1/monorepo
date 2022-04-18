import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { ICreateAET } from '../dto/create-aet.dto';

const { AET } = controllers;
export const createAET = async (dto: ICreateAET) => {
  const { data } = await instance.post<string>(AET, dto);
  return data;
};

export const useCreateAET = () => useMutation(createAET);
