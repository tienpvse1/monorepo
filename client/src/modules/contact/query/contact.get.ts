import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IContact } from '../entity/contact.entity';

const { CONTACT } = controllers;

export const QUERY_CONTACTS = 'query-contacts';
export const QUERY_CONTACTS_LIKE_EMAIL = 'query-contacts';
export const QUERY_CONTACTS_BY_ID = 'query-contact-by-id';

const getContacts = async (accountId: string) => {
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
  const { data } = await instance.get<IContact[]>(`${CONTACT}?${query}`);
  return data;
};
const getAllContacts = async () => {
  const query = RequestQueryBuilder.create({
    join: [
      {
        field: 'account'
      }
    ]
  }).query(false);
  const { data } = await instance.get<IContact[]>(`${CONTACT}?${query}`);
  return data;
};

export const getContactsEmailLike = async (searchKey: string) => {
  const queryBuilder = RequestQueryBuilder.create();
  const queryString = queryBuilder
    .select(['email'])
    .setFilter({ field: 'email', operator: 'cont', value: searchKey })
    .query(false);
  const { data } = await instance.get<{ email: string; id: string }[]>(
    `${CONTACT}?${queryString}`
  );
  const result = data.map((item) => item.email);

  return result;
};

export const getContactsById = async (contactId: string) => {
  const query = RequestQueryBuilder.create({
    filter: [
      {
        field: 'id',
        operator: '$eq',
        value: contactId,
      },
    ],
    join: [
      { field: 'account' },
      { field: 'company' },
      { field: 'account.team' },
      { field: 'pipelineItems' }
    ],
  }).query(false);
  const { data } = await instance.get<IContact[]>(`${CONTACT}?${query}`);
  return data[0];
};

export const useContactsWithEmailLike = (queryKey: string) =>
  useQuery(
    [QUERY_CONTACTS_LIKE_EMAIL, queryKey],
    () => getContactsEmailLike(queryKey),
    {
      enabled: Boolean(queryKey),
      useErrorBoundary: true,
    }
  );

export const useContacts = (accountId: string) =>
  useQuery([QUERY_CONTACTS, accountId], () => getContacts(accountId), {
    enabled: Boolean(accountId),
  });
  
export const useQueryAllContacts = () =>
  useQuery([QUERY_CONTACTS], () => getAllContacts());

export const useQueryContactsById = (contactId: string) =>
  useQuery(QUERY_CONTACTS_BY_ID, () => getContactsById(contactId));
