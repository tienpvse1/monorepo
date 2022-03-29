import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { ICreateReasonDto } from '../dto/create-reason.dto';
import { IReason } from '../entity/reason.entity';

const { REASON } = controllers;
const createReason = async (dto: ICreateReasonDto) => {
  const { data } = await instance.post<IReason>(REASON, dto);
  return data;
};

export const useCreateReason = () => useMutation(createReason);