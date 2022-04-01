import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import moment from 'moment';
import { useQuery } from 'react-query';
import { IEmail } from '../entity/email.enity';

const { MAILER } = controllers;
export const QUERY_MY_SENT_EMAILS = 'query-my-sent-emails';
export const QUERY_MY_SENT_EMAILS_BY_ID = 'query-my-sent-emails-by-id';
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
  data.sort(
    (b, a) =>
      moment(a.createdAt).toDate().getTime() -
      moment(b.createdAt).toDate().getTime()
  );
  return data;
};
export const getMySentEmailById = async (accountId: string, id: string) => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'account' }],
    filter: [
      {
        field: 'account.id',
        operator: '$eq',
        value: accountId,
      },
      {
        field: 'id',
        operator: '$eq',
        value: id,
      },
    ],
  }).query(false);
  const { data } = await instance.get<IEmail[]>(`${MAILER}?${query}`);

  return data;
};

export const useMySentEmails = (accountId: string, suspense = false) =>
  useQuery([QUERY_MY_SENT_EMAILS, accountId], () => getMySentEmail(accountId), {
    enabled: Boolean(accountId),
    suspense,
  });
export const useMySentEmailsById = (
  accountId: string,
  id: string,
  suspense = false
) =>
  useQuery(
    [QUERY_MY_SENT_EMAILS_BY_ID, accountId, id],
    () => getMySentEmailById(accountId, id),
    {
      enabled: Boolean(accountId) && Boolean(id),
      suspense,
    }
  );
