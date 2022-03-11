import { IAccount } from '@interfaces/account';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { Axios, instance } from '../../../axios';
import { controllers } from '../../../constance/controllers';

const { ACCOUNT } = controllers;
export const getUser = async () => {
  const { instance } = new Axios();
  const { data } = await instance.get(`${ACCOUNT}/custom`, {
    data: {},
  });
  return data;
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
  const { data } = await instance.get<IAccount>(`${ACCOUNT}?${queryBuilder}`);
  return data;
};
