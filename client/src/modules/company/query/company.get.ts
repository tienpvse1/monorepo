import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useQuery } from 'react-query';
import { ICompany } from '../entity/company.entity';

const { COMPANY } = controllers;
export const QUERY_COMPANIES = 'query-companies';
export const getCompanies = async () => {
  const { data } = await instance.get<ICompany[]>(COMPANY);
  return data;
};

export const useCompanies = () => useQuery(QUERY_COMPANIES, getCompanies);
