import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { INotification } from '../entity/notification.entity';

const { NOTIFICATION } = controllers;
export const seenNotification = async () => {
  const { data } = await instance.patch<INotification[]>(
    `${NOTIFICATION}/seen`
  );
  return data;
};

export const useSeen = () => useMutation(seenNotification);
