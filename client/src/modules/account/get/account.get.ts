import { IAccount } from '@interfaces/account';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { Axios, instance } from '../../../axios';
import { controllers } from '../../../constance/controllers';
import { useQuery } from 'react-query';
import { Role } from '@interfaces/type-roles';
const { ACCOUNT } = controllers;

export const GET_ACCOUNT_BY_SALE_ROLE = 'get-account-by-sale-role';
export const QUERY_SALE_ACCOUNTS = 'query-sale-accounts';
export const QUERY_ALL_ACCOUNTS = 'query-all-accounts';
export const QUERY_ACCOUNT_BY_ID = 'query-account-by-id';
export const QUERY_TEAM_PIPELINE_ITEMS = 'query-team-pipeline-items';
export const getUser = async () => {
  const { instance } = new Axios();
  const { data } = await instance.get(`${ACCOUNT}/custom`, {
    data: {},
  });
  return data;
};

export const getAllAccount = async () => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'role' }],
    sort: [
      {
        field: 'account.role.name',
        order: 'ASC',
      },
    ],
    filter: [
      {
        field: 'role.name',
        operator: '$notnull',
      },
      {
        field: 'role.name',
        operator: '$ne',
        value: Role.SYSTEM,
      },
      {
        field: 'role.name',
        operator: '$ne',
        value: Role.ADMIN,
      },
    ],
  }).query(false);
  const { data } = await instance.get<IAccount[]>(`${ACCOUNT}?${query}`);
  return data;
};

export const getSaleAccounts = async () => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'team' }, { field: 'role' }],
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
    ...item,
  }));
};

export const getAccountById = async (id: string) => {
  const query = RequestQueryBuilder.create({
    join: [
      { field: 'team' },
      { field: 'team.accounts' },
      { field: 'team.accounts.schedules' },
    ],
    filter: [
      {
        field: 'id',
        operator: '$eq',
        value: id,
      },
    ],
  }).query(false);
  const { data } = await instance.get<IAccount[]>(`${ACCOUNT}?${query}`);
  const result = data.map((item) => ({
    ...item,
    team: {
      ...item.team,
      accounts: item.team.accounts
        .filter((account) => account.id !== id)
        .map((account) => ({
          ...account,
          schedules: account.schedules.filter((schedule) => !schedule.isDone),
        })),
    },
  }));

  return result[0];
};
export const getTeamPipelineItems = async (id: string) => {
  const query = RequestQueryBuilder.create({
    join: [
      { field: 'team' },
      { field: 'team.accounts' },
      { field: 'team.accounts.schedules' },
      { field: 'team.accounts.pipelineItems' },
    ],
    filter: [
      {
        field: 'id',
        operator: '$eq',
        value: id,
      },
    ],
  }).query(false);
  const { data } = await instance.get<IAccount[]>(`${ACCOUNT}?${query}`);
  const mapped = data[0].team.accounts.map((item) => item.pipelineItems);
  const result = [];
  mapped.forEach((item) => {
    result.push(...item);
  });

  return result;
};

export const useAccountById = (id: string, suspense = true) =>
  useQuery([QUERY_ACCOUNT_BY_ID, id], () => getAccountById(id), {
    enabled: Boolean(id),
    suspense,
  });

export const useQueryAccountBySaleRole = () =>
  useQuery(GET_ACCOUNT_BY_SALE_ROLE, () => getSaleAccounts());

export const useSaleAccounts = (suspense = false) =>
  useQuery(QUERY_SALE_ACCOUNTS, getSaleAccounts, { suspense });

export const useAccounts = (suspense = false) =>
  useQuery(QUERY_ALL_ACCOUNTS, getAllAccount, { suspense });

export const useTeamPipelineItems = (id: string) =>
  useQuery([QUERY_TEAM_PIPELINE_ITEMS, id], () => getTeamPipelineItems(id), {
    enabled: Boolean(id),
  });
