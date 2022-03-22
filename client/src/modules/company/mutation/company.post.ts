import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { handleMutationResponse } from '@modules/base/base.handler';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { QUERY_COMPANIES } from '../query/company.get';
const { COMPANY } = controllers;

export const createCompany = async (company: CreateCompanyDto) => {
  const { data } = await instance.post(COMPANY, company);
  return data;
}

export const useCreateCompany = () =>
  useMutation(createCompany, {
    ...handleMutationResponse(QUERY_COMPANIES)
  });