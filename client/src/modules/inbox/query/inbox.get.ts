import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IInbox } from '../entity/inbox.entity';

const { INBOX } = controllers;
export const QUERY_MY_INBOX_EMAIL = 'query-my-inbox-emails';
export const getMyInboxEmails = async (accountId: string) => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'receiver' }],
    filter: [
      {
        field: 'receiver.id',
        operator: '$eq',
        value: accountId,
      },
    ],
  }).query(false);
  const { data } = await instance.get<IInbox[]>(`${INBOX}?${query}`);
  return data;
};

export const useMyInboxEmails = (accountId: string) =>
  useQuery(
    [QUERY_MY_INBOX_EMAIL, accountId],
    () => getMyInboxEmails(accountId),
    {
      enabled: Boolean(accountId),
      suspense: true,
    }
  );
