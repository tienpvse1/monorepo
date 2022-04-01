import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IInbox } from '../entity/inbox.entity';

const { INBOX } = controllers;
export const QUERY_MY_INBOX_EMAIL = 'query-my-inbox-emails';
export const QUERY_MY_INBOX_EMAIL_BY_ID = 'query-my-inbox-email-by-id';
export const QUERY_MY_INBOX_EMAIL_FROM_CONTACTS =
  'query-my-inbox-emails-from-contacts';
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
export const getMyInboxEmailsFromContacts = async (accountId: string) => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'receiver' }, { field: 'sender' }],
    filter: [
      {
        field: 'receiver.id',
        operator: '$eq',
        value: accountId,
      },
      {
        field: 'isAnonymous',
        operator: '$eq',
        value: false,
      },
    ],
  }).query(false);
  const { data } = await instance.get<IInbox[]>(`${INBOX}?${query}`);
  return data;
};

export const getInboxById = async (id: string) => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'sender' }, { field: 'receiver' }],
    filter: [
      {
        field: 'id',
        operator: '$eq',
        value: id,
      },
    ],
  }).query(false);
  const { data } = await instance.get<IInbox[]>(`${INBOX}?${query}`);
  return data;
};

export const useMyInboxEmails = (accountId: string, suspense = false) =>
  useQuery(
    [QUERY_MY_INBOX_EMAIL, accountId],
    () => getMyInboxEmails(accountId),
    {
      enabled: Boolean(accountId),
      suspense,
    }
  );
export const useMyInboxEmailsFromContacts = (
  accountId: string,
  suspense = false
) =>
  useQuery(
    [QUERY_MY_INBOX_EMAIL_FROM_CONTACTS, accountId],
    () => getMyInboxEmailsFromContacts(accountId),
    {
      enabled: Boolean(accountId),
      suspense,
    }
  );
export const useInboxById = (id: string, suspense = false) =>
  useQuery([QUERY_MY_INBOX_EMAIL_BY_ID, id], () => getInboxById(id), {
    enabled: Boolean(id),
    suspense,
  });
