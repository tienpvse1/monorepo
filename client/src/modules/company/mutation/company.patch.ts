import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { handleMutationResponse } from '@modules/base/base.handler';
import { useMutation } from 'react-query';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { QUERY_COMPANIES } from '../query/company.get';

const { COMPANY } = controllers;

const updateCompany = async (id: string, company: UpdateCompanyDto) => {
  const { data } = await instance.patch(`${COMPANY}/${id}`, company);
  return data;
};

export const useUpdateCompany = () =>
  useMutation(
    ({ id, ...rest }: UpdateCompanyDto & { id: string }) =>
      updateCompany(id, rest),
    {
      ...handleMutationResponse(QUERY_COMPANIES),
    }
  );
