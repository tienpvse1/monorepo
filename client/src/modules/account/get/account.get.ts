import { IAccount } from '@interfaces/account';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { Axios, instance } from '../../../axios';
import { controllers } from '../../../constance/controllers';

const { ACCOUNT } = controllers;

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

export const useSaleAccounts = () =>
  useQuery(QUERY_SALE_ACCOUNTS, getSaleAccounts);
