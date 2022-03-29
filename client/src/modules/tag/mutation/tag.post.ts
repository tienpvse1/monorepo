import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { ICreateTagDto } from '../dto/create-tag.dto';
import { ITag } from '../entity/tag.entity';

const { TAG } = controllers;

const createTag = async (dto: ICreateTagDto) => {
  const { data } = await instance.post<ITag>(TAG, dto);
  return data;
};

export const useCreateTag = () => useMutation(createTag);
