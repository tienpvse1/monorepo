import { IAccount } from '@interfaces/account';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { Axios, instance } from '../../../axios';
import { controllers } from '../../../constance/controllers';
import { useQuery } from 'react-query';
const { ACCOUNT } = controllers;

export const GET_ACCOUNT_BY_SALE_ROLE = "get-account-by-sale-role";
export const QUERY_SALE_ACCOUNTS = 'query-sale-accounts';
export const getUser = async () => {
  const { instance } = new Axios();
  const { data } = await instance.get(`${ACCOUNT}/custom`, {
    data: {},
  });
  return data;
};

export const getSaleAccounts = async () => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'role' }],
    filter: [
      {
        field: 'role.name',
        operator: '$eq',
        value: 'sale',
      },
    ],
  }).query(false);
  const { data } = await instance.get<IAccount[]>(`${ACCOUNT}?${query}`);
  return data.map((item) => ({
    id: item.id,
    name: `${item.firstName} ${item.lastName}`,
    photo: item.photo,
  }));
};

export const getAccountById = async (id: string) => {
  const { data } = await instance.get<IAccount>(`${ACCOUNT}/${id}`);
  return data;
};

export const getAccountBySaleRole = async () => {
  const queryBuilder = RequestQueryBuilder.create({
    join: [
      { field: 'role' }
    ],
    filter: [
      {
        field: 'role.name',
        operator: '$eq',
        value: 'sale',
      },
    ],
  }).query(false);
  const { data } = await instance.get<IAccount[]>(`${ACCOUNT}?${queryBuilder}`);
  return data;
};

export const useQueryAccountBySaleRole = () =>
  useQuery(GET_ACCOUNT_BY_SALE_ROLE, () => getAccountBySaleRole())
export const useSaleAccounts = () =>
  useQuery(QUERY_SALE_ACCOUNTS, getSaleAccounts);
