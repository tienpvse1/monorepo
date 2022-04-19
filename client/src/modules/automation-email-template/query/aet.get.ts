import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { EmailTemplateType } from '../dto/create-aet.dto';
import { IAET } from '../entity/aet.entity';

const { AET } = controllers;
export const QUERY_AET = 'query-aet';
export const getEmailTemplates = async (type: EmailTemplateType) => {
  const query = RequestQueryBuilder.create({
    filter: [
      {
        field: 'type',
        operator: '$eq',
        value: type,
      },
    ],
    join: [{ field: 'account' }],
  }).query(false);
  const { data } = await instance.get<IAET[]>(`${AET}?${query}`);
  return data[0];
};

export const useAET = (type: EmailTemplateType, suspense = true) =>
  useQuery([QUERY_AET, type], () => getEmailTemplates(type), {
    enabled: Boolean(type),
    suspense,
    retry: false,
  });
