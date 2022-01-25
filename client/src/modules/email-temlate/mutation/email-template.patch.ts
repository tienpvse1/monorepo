import { Axios } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { IUpdateEmailTemplateDto } from '../dto/update-email-template.dto';

const { EMAIL_TEMPLATE } = controllers;

const updateEmailTemplate = async ({ id, design }: IUpdateEmailTemplateDto) => {
  const { instance } = new Axios();
  const { data } = await instance.patch(`${EMAIL_TEMPLATE}/${id}`, { design });
  return data;
};

export const useUpdateEmailTemplate = () => useMutation(updateEmailTemplate);
