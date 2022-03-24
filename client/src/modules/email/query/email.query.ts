import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IEmail } from '../entity/email.enity';

const { MAILER } = controllers;
export const QUERY_MY_SENT_EMAILS = 'query-my-sent-emails';
export const getMySentEmail = async (accountId: string) => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'account' }],
    filter: [
      {
        field: 'account.id',
        operator: '$eq',
        value: accountId,
      },
    ],
  }).query(false);
  const { data } = await instance.get<IEmail[]>(`${MAILER}?${query}`);
  return data;
};

export const useMySentEmails = (accountId: string) =>
  useQuery([QUERY_MY_SENT_EMAILS, accountId], () => getMySentEmail(accountId), {
    enabled: Boolean(accountId),
    suspense: true,
  });
