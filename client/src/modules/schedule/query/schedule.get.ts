import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { queryWithIdProps } from '@modules/base/base.handler';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { convert, convert2 } from '@util/date';
import moment from 'moment';
import { useQuery, UseQueryResult } from 'react-query';
import { ISchedule } from '../entity/schedule.entity';

const { SCHEDULE } = controllers;
export const QUERY_SCHEDULES = 'query-schedules';
export const QUERY_ALL_SCHEDULES = 'query-schedules';
export const QUERY_UPCOMING_SCHEDULES = 'query-upcoming-schedules';
const getMySchedules = async (id: string, pipelineItemId: string) => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'account' }, { field: 'pipelineItem' }],
    filter: [
      {
        field: 'account.id',
        operator: '$eq',
        value: id,
      },
      {
        field: 'pipelineItem.id',
        operator: '$eq',
        value: pipelineItemId,
      },
    ],
  }).query(false);
  const { data } = await instance.get<ISchedule[]>(`${SCHEDULE}?${query}`);
  return data;
};

const getMySchedulesByMonth = async (id: string, month: number) => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), month, 1);
  var lastDay = new Date(date.getFullYear(), month + 1, 0);

  const query = RequestQueryBuilder.create({
    join: [{ field: 'account' }, { field: 'pipelineItem' }, { field: 'activityType' }],
    filter: [
      {
        field: 'account.id',
        operator: '$eq',
        value: id,
      },
      {
        field: 'dueDate',
        operator: '$gte',
        value: convert(firstDay.toString()),
      },
      {
        field: 'dueDate',
        operator: '$lte',
        value: convert(lastDay.toString()),
      },
    ],
  }).query(false);
  const { data } = await instance.get<ISchedule[]>(`${SCHEDULE}?${query}`);
  return data;
};

const getAllSchedule = async () => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'account' }, { field: 'pipelineItem' }],
  }).query(false);
  const { data } = await instance.get<ISchedule[]>(`${SCHEDULE}?${query}`);
  return data;
};

export const useQueryAllSchedule = () => useQuery(SCHEDULE, getAllSchedule);

/**
 * get upcoming event in date
 */
export const getUpcomingEvents = async ({
  accountId,
  date,
}: {
  accountId: string;
  date: Date;
}) => {
  const query = RequestQueryBuilder.create({
    join: [
      { field: 'account' },
      { field: 'activityType' }
    ],
    filter: [
      {
        field: 'account.id',
        operator: '$eq',
        value: accountId,
      },
      {
        field: 'dueDate',
        operator: '$gte',
        value: convert2(moment(date).startOf('date').toDate().toString()),
      },
      {
        field: 'dueDate',
        operator: '$lte',
        value: convert2(moment(date).endOf('date').toDate().toString()),
      },
    ],
    limit: 5,
    sort: [
      {
        field: 'dueDate',
        order: 'ASC',
      },
    ],
  }).query(false);
  const { data } = await instance.get<ISchedule[]>(`${SCHEDULE}?${query}`);
  return data;
};

const getAllMySchedules = async (accountId: string) => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'account' }],
    filter: [
      { field: 'account.id', operator: '$eq', value: accountId },
      { field: 'isDone', operator: '$eq', value: false },
    ],
  }).query(false);
  const { data } = await instance.get<ISchedule[]>(`${SCHEDULE}?${query}`);
  return data;
};

export const useAllMySchedules = (accountId: string) =>
  useQuery(
    [QUERY_ALL_SCHEDULES, accountId],
    () => getAllMySchedules(accountId),
    {
      enabled: Boolean(accountId),
    }
  );

export const useSchedules = (
  accountId: string,
  pipelineItemId: string
): UseQueryResult<ISchedule[], any> =>
  useQuery(
    [QUERY_SCHEDULES, accountId],
    () => getMySchedules(accountId, pipelineItemId),
    {
      ...queryWithIdProps(accountId),
    }
  );
export const useSchedulesByMonth = (
  accountId: string,
  month: number
): UseQueryResult<ISchedule[], any> =>
  useQuery(
    [QUERY_SCHEDULES, accountId],
    () => getMySchedulesByMonth(accountId, month),
    {
      ...queryWithIdProps(accountId, false),
    }
  );

export const useUpcomingEvents = ({
  accountId,
  date,
}: {
  accountId: string;
  date: Date;
}) =>
  useQuery(
    [QUERY_UPCOMING_SCHEDULES, { accountId, date }],
    () => getUpcomingEvents({ accountId, date }),
    {
      enabled: Boolean(accountId) && Boolean(date),
    }
  );
