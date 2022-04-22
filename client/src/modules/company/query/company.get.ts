import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { useQuery } from 'react-query';
import { ICompany } from '../entity/company.entity';

const { COMPANY } = controllers;
export const QUERY_COMPANIES = 'query-companies';
export const QUERY_COMPANY_DETAILS = 'query-company-details';

export const getCompanies = async () => {
  const query = RequestQueryBuilder.create({
    join: [
      { field: 'contacts' },
      { field: 'contacts.account' },
      { field: 'contacts.pipelineItems' },
      { field: 'contacts.pipelineItems.pipelineColumn' },
      { field: 'contacts.pipelineItems.opportunityRevenue' },
      { field: 'city' },
    ],
    sort: [{ field: 'createdAt', order: 'DESC' }]
  }).query(false);

  const { data } = await instance.get<ICompany[]>(`${COMPANY}?${query}`);
  return data;
};

export const getCompaniesWithColumn = async () => {
  const { data } = await instance.get<ICompany[]>(`${COMPANY}/with-column`);
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
      { field: 'city' },
    ]
  }).query(false);
  const { data } = await instance.get<ICompany[]>(`${COMPANY}?${query}`);
  return data[0];
};

export const searchCompany = async (text: string) => {
  const query = RequestQueryBuilder.create({
    join: [{ field: 'city' }],
    search: {
      $or: [
        {
          name: {
            $cont: text
          },
        },
        {
          mobile: {
            $cont: text
          },
        },
        {
          'city.admin_name': {
            $cont: text
          }
        },
        {
          country: {
            $cont: text
          }
        }
      ]
    },

  }).query(false);
  const { data } = await instance.get<ICompany[]>(`${COMPANY}?${query}`);
  return data;
};

export const useCompanies = () => useQuery(QUERY_COMPANIES, getCompanies);
export const useCompaniesWithColumn = () => useQuery([QUERY_COMPANIES, 'with-column'], getCompaniesWithColumn);

export const useQueryCompanyById = (companyId: string) =>
  useQuery(QUERY_COMPANY_DETAILS, () => getCompanyById(companyId), {
    enabled: Boolean(companyId)
  })