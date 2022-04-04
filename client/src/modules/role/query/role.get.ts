import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useQuery } from 'react-query';
import { IRole } from '../entity/role.entity';

const { ROLE } = controllers;
const QUERY_ROLES = 'query-roles';
export const getRoles = async () => {
  const { data } = await instance.get<IRole[]>(ROLE);
  return data;
};

export const useRoles = () => useQuery(QUERY_ROLES, getRoles);
