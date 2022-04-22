import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IPipelineItem } from '../entity/pipeline-items.entity';

const { PIPELINE_ITEM } = controllers;
export const GET_PIPELINE_ITEM_BY_ID = 'get-pipeline-item-by-id';
export const GET_PIPELINE_ITEM_BY_ACCOUNT = 'get-pipeline-item-by-account';
export const GET_ALL_PIPELINE_ITEM = 'get-all-pipeline-item';
export const GET_LOSE_PIPELINE_ITEMS = 'get-lose-pipeline-items';
export const GET_MY_LOSE_PIPELINE_ITEMS = 'get-my-lose-pipeline-items';

export const getPipelineItemById = async (id: string) => {
  const queryBuilder = RequestQueryBuilder.create({
    join: [
      { field: 'noteWorthies' },
      { field: 'discountCode' },
      { field: 'pipelineColumn' },
      { field: 'opportunityRevenue' },
      { field: 'opportunityRevenue.product' },
      { field: 'opportunityRevenue.course' },
      { field: 'account' },
      { field: 'account.team' },
      { field: 'contact' },
      { field: 'contact.company' },
      { field: 'schedules' },
      { field: 'reason' },
    ],
    filter: [
      {
        field: 'id',
        operator: '$eq',
        value: id,
      },
    ],
  }).query(false);

  const { data } = await instance.get<IPipelineItem[]>(
    `${PIPELINE_ITEM}?${queryBuilder}`
  );
  return data[0];
};

export const getPipelineByAccountID = async (accountId: string) => {
  const queryBuilder = RequestQueryBuilder.create({
    join: [
      { field: 'pipelineColumn' },
      { field: 'account' },
      { field: 'contact' },
      { field: 'reason' },
      { field: 'opportunityRevenue' },
      { field: 'opportunityRevenue.course' },
    ],
    filter: [
      {
        field: 'account.id',
        operator: '$eq',
        value: accountId,
      },
      {
        field: 'deletedAt',
        operator: '$isnull',
      },
    ],
    sort: [{ field: 'createdAt', order: 'DESC' }],
  }).query(false);

  const { data } = await instance.get<IPipelineItem[]>(
    `${PIPELINE_ITEM}?${queryBuilder}`
  );
  return data;
};

export const getAllPipelineItem = async () => {
  const queryBuilder = RequestQueryBuilder.create({
    join: [
      { field: 'pipelineColumn' },
      { field: 'account' },
      { field: 'contact' },
      { field: 'reason' },
    ],
    sort: [{ field: 'createdAt', order: 'DESC' }],
  }).query(false);

  const { data } = await instance.get<IPipelineItem[]>(
    `${PIPELINE_ITEM}?${queryBuilder}`
  );
  console.log('fetched');

  return data;
};
export const searchPipelineItem = async (text: string, accountId?: string) => {
  const queryBuilder = RequestQueryBuilder.create({
    join: [
      { field: 'pipelineColumn' },
      { field: 'account' },
      { field: 'contact' },
      { field: 'reason' },
    ],
    search: {
      $and: [
        {
          $or: [
            {
              name: {
                $cont: text,
              },
            },
            {
              'contact.name': {
                $cont: text,
              },
            },
            {
              'contact.email': {
                $cont: text,
              },
            },
            {
              'account.firstName': {
                $cont: text,
              },
            },
          ],
        },
        {
          'account.id': {
            $eq: accountId,
          },
        },
      ],
    },
  }).query(false);

  const { data } = await instance.get<IPipelineItem[]>(
    `${PIPELINE_ITEM}?${queryBuilder}`
  );

  return data;
};
export const searchAllPipelineItem = async (text: string) => {
  const queryBuilder = RequestQueryBuilder.create({
    join: [
      { field: 'pipelineColumn' },
      { field: 'account' },
      { field: 'contact' },
    ],
    search: {
      $or: [
        {
          name: {
            $cont: text,
          },
        },
        {
          'contact.name': {
            $cont: text,
          },
        },
        {
          'contact.email': {
            $cont: text,
          },
        },
        {
          'account.firstName': {
            $cont: text,
          },
        },
      ],
    },
  }).query(false);

  const { data } = await instance.get<IPipelineItem[]>(
    `${PIPELINE_ITEM}?${queryBuilder}`
  );

  return data;
};

export const getLostOpportunity = async () => {
  const query = RequestQueryBuilder.create({
    filter: [{ field: 'isLose', operator: '$eq', value: true }],
    join: [
      {
        field: 'reason',
      },
    ],
  }).query(false);
  const { data } = await instance.get<IPipelineItem[]>(
    `${PIPELINE_ITEM}?${query}`
  );
  return data;
};
export const getMyLostOpportunity = async (accountId: string) => {
  const query = RequestQueryBuilder.create({
    filter: [
      { field: 'isLose', operator: '$eq', value: true },
      { field: 'account.id', operator: '$eq', value: accountId },
    ],
    join: [
      {
        field: 'reason',
      },
      {
        field: 'account',
      },
    ],
  }).query(false);
  const { data } = await instance.get<IPipelineItem[]>(
    `${PIPELINE_ITEM}?${query}`
  );
  return data;
};
export const usePipelineItem = (id: string) =>
  useQuery([GET_PIPELINE_ITEM_BY_ID, id], () => getPipelineItemById(id), {
    suspense: true,
    enabled: Boolean(id),
  });

export const usePipelineItems = () =>
  useQuery(GET_ALL_PIPELINE_ITEM, getAllPipelineItem, {
    suspense: true,
  });

export const useQueryPipelineByAccountId = (accountId: string) =>
  useQuery([GET_PIPELINE_ITEM_BY_ACCOUNT, accountId], () =>
    getPipelineByAccountID(accountId)
  );
export const useMyPipelineItems = (accountId: string) =>
  useQuery(
    [GET_PIPELINE_ITEM_BY_ACCOUNT, accountId],
    () => getPipelineByAccountID(accountId),
    {
      enabled: Boolean(accountId),
    }
  );

export const useLosePipelineItems = () =>
  useQuery([GET_LOSE_PIPELINE_ITEMS], getLostOpportunity);

export const useMyLosePipelineItems = (accountId: string, suspense = false) =>
  useQuery(
    [GET_MY_LOSE_PIPELINE_ITEMS, accountId],
    () => getMyLostOpportunity(accountId),
    {
      enabled: Boolean(accountId),
      suspense,
    }
  );
