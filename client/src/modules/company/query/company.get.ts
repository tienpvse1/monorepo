import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { ICompany } from '../entity/company.entity';

const { COMPANY } = controllers;
export const QUERY_COMPANIES = 'query-companies';
export const QUERY_COMPANY_DETAILS = 'query-company-details';

export const getCompanies = async () => {
  const { data } = await instance.get<ICompany[]>(COMPANY);
  return data;
};

export const getCompanyById = async (companyId: string) => {
  const query = RequestQueryBuilder.create({
    filter: [
      {
        field: 'id',
        operator: '$eq',
        value: companyId,
      },
    ],
    join: [
      { field: 'account' },
      { field: 'contacts' },
    ]
  }).query(false);
  const { data } = await instance.get<ICompany[]>(`${COMPANY}?${query}`);
  return data[0];
};

export const useCompanies = () => useQuery(QUERY_COMPANIES, getCompanies);

export const useQueryCompanyById = (companyId: string) =>
  useQuery(QUERY_COMPANY_DETAILS, () => getCompanyById(companyId), {
    enabled: Boolean(companyId)
  })