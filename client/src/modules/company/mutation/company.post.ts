import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { CreateCompanyDto } from '../dto/create-company.dto';
const { COMPANY } = controllers;

export const createCompany = async (company: CreateCompanyDto) => {
  const { data } = await instance.post(COMPANY, company);
  return data;
}

export const useCreateCompany = () => useMutation(createCompany);