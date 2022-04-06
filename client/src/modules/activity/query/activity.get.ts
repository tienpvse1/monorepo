import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useQuery } from 'react-query';
import { IActivityType } from '../entity/activity.entity';

const { ACTIVITY_TYPE } = controllers;

export const QUERY_ALL_ACTIVITY = 'query-all-activity';

export const getAllActivities = async () => {
  const { data } = await instance.get<IActivityType[]>(ACTIVITY_TYPE);
  return data;
};

export const useActivityTypes = (suspense = false) =>
  useQuery(QUERY_ALL_ACTIVITY, getAllActivities, { suspense });
