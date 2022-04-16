import { instance } from '@axios';
import { IPaginate } from '@common/paginate';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IContact } from '../entity/contact.entity';

const { CONTACT } = controllers;

export const QUERY_CONTACTS = 'query-contacts';
export const QUERY_CONTACTS_LIKE_EMAIL = 'query-contacts';
export const QUERY_CONTACTS_BY_ID = 'query-contact-by-id';
export const QUERY_PAGINATED_CONTACTS = 'query-paginated-contacts';

const getContacts = async (accountId: string) => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'account' }, { field: 'company' }],
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
      { field: 'account' },
      { field: 'company' },
      { field: 'tags' },
      { field: 'pipelineItems' },
      { field: 'pipelineItems.schedules' },
      { field: 'pipelineItems.pipelineColumn' },
    ],
    sort: [{ field: 'createdAt', order: 'DESC' }],
  }).query(false);
  const { data } = await instance.get<IContact[]>(`${CONTACT}?${query}`);
  return data;
};

export const getContactsEmailLike = async (searchKey = '') => {
  const queryBuilder = RequestQueryBuilder.create();
  const queryString = queryBuilder
    .select(['email'])
    .setFilter({ field: 'email', operator: 'cont', value: searchKey })
    .setLimit(6)
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
      { field: 'pipelineItems' },
      { field: 'pipelineItems.pipelineColumn' },
      { field: 'tags' },
    ],
  }).query(false);
  const { data } = await instance.get<IContact[]>(`${CONTACT}?${query}`);
  return data[0];
};
export const searchContacts = async (text: string) => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'account' }],
    search: {
      $or: [
        {
          name: {
            $cont: text,
          },
        },
        {
          email: {
            $cont: text,
          },
        },
        {
          phone: {
            $cont: text,
          },
        },
      ],
    },
  }).query(false);
  const { data } = await instance.get<IContact[]>(`${CONTACT}?${query}`);
  return data;
};

export const useContactsWithEmailLike = (queryKey: string) =>
  useQuery(
    [QUERY_CONTACTS_LIKE_EMAIL, queryKey],
    () => getContactsEmailLike(queryKey),
    {
      useErrorBoundary: true,
    }
  );
export const getPaginatedContacts = async (size: number, page: number) => {
  const query = RequestQueryBuilder.create({
    offset: page * (size - 1),
    limit: size,
    join: ['tags'],
  }).query(false);
  const { data } = await instance.get<IPaginate<IContact>>(
    `${CONTACT}?${query}`
  );
  return data;
};

export const useContacts = (accountId: string, suspense = false) =>
  useQuery([QUERY_CONTACTS, accountId], () => getContacts(accountId), {
    enabled: Boolean(accountId),
    suspense,
  });

export const useQueryAllContacts = () =>
  useQuery(QUERY_CONTACTS, () => getAllContacts(), {
    placeholderData: [],
  });

export const useQueryContactsById = (contactId: string) =>
  useQuery(QUERY_CONTACTS_BY_ID, () => getContactsById(contactId), {
    enabled: Boolean(contactId),
  });

export const usePaginatedContacts = (size: number, page: number) =>
  useQuery([QUERY_PAGINATED_CONTACTS, size, page], () =>
    getPaginatedContacts(size, page)
  );
