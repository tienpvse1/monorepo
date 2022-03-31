import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { INotification } from '../entity/notification.entity';

const { NOTIFICATION } = controllers;
export const QUERY_NOTIFICATIONS = 'query-notifications';
export const getNotifications = async (accountId: string) => {
  const query = RequestQueryBuilder.create({
    join: [
      {
        field: 'receiver',
      },
      {
        field: 'sender',
      },
    ],
    filter: {
      field: 'receiver.id',
      operator: '$eq',
      value: accountId,
    },
  }).query(false);

  const { data } = await instance.get<INotification[]>(
    `${NOTIFICATION}?${query}`
  );
  return data;
};

export const useNotifications = (accountId: string) =>
  useQuery(
    [QUERY_NOTIFICATIONS, accountId],
    () => getNotifications(accountId),
    {
      enabled: Boolean(accountId),
    }
  );
