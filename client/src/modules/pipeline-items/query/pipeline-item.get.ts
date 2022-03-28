import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { IPipelineItem } from '../entity/pipeline-items.entity';

const { PIPELINE_ITEM } = controllers;
export const GET_PIPELINE_ITEM_BY_ID = 'get-pipeline-item-by-id';
export const GET_PIPELINE_ITEM_BY_ACCOUNT = 'get-pipeline-item-by-account';
export const GET_ALL_PIPELINE_ITEM = 'get-all-pipeline-item';

export const getPipelineId = async (id: string) => {
  const queryBuilder = RequestQueryBuilder.create({
    join: [
      { field: 'noteWorthies' },
      { field: 'pipelineColumn' },
      { field: 'opportunityRevenue' },
      { field: 'opportunityRevenue.product' },
      { field: 'account' },
      { field: 'account.team' },
      { field: 'contact' },
      { field: 'contact.company' },
      { field: 'schedules' },
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
    ],
    filter: [
      {
        field: 'account.id',
        operator: '$eq',
        value: accountId,
      },
    ],
    sort: [{ field: 'createdAt', order: 'DESC' }]
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
    ],
    sort: [{ field: 'createdAt', order: 'DESC' }]
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
    ],
    search: {
      $and: [
        {
          $or: [
            {
              name: {
                $cont: text
              },
            },
            {
              'contact.name': {
                $cont: text
              }
            },
            {
              'account.firstName': {
                $cont: text,
              }
            }
          ]
        },
        {
          'account.id': {
            $eq: accountId
          }
        }
      ]
    }
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
            $cont: text
          },
        },
        {
          'contact.name': {
            $cont: text
          }
        },
        {
          'account.firstName': {
            $cont: text,
          }
        }
      ]
    }
  }).query(false);

  const { data } = await instance.get<IPipelineItem[]>(
    `${PIPELINE_ITEM}?${queryBuilder}`
  );

  return data;
};

export const usePipelineItem = (id: string) =>
  useQuery([GET_PIPELINE_ITEM_BY_ID, id], () => getPipelineId(id), {
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
