import { Axios } from '@axios';
import { controllers } from '@constance/controllers';
import { useQuery } from 'react-query';
import { IEmailTemplate } from '../entity/email-template.entity';

const { EMAIL_TEMPLATE } = controllers;
export const FETCH_TEMPLATE_KEY = 'fetch-template';
export const FETCH_TEMPLATES_KEY = 'fetch-templates';

export const getTemplateById = async (id: string = '') => {
  const { instance } = new Axios();
  const { data } = await instance.get(`${EMAIL_TEMPLATE}/${id}`);
  return data.data as IEmailTemplate;
};

export const findAllTemplates = async () => {
  const { instance } = new Axios();
  const { data } = await instance.get(`${EMAIL_TEMPLATE}`);
  return data.data as IEmailTemplate[];
};

export const useGetTemplateById = (id: string) =>
  useQuery([FETCH_TEMPLATE_KEY, id], () => getTemplateById(id), {
    enabled: !!id,
  });

export const useGetAllTemplates = () =>
  useQuery(FETCH_TEMPLATES_KEY, findAllTemplates);
