import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { CreateOpportunityHistoryDto } from '../dto/create-opportunity-history.dto';
import { IOpportunityHistory } from '../entity/opportunity-history.entity';

const { OPPORTUNITY_HISTORY } = controllers;
export const createOpportunityHistory = async (
  dto: CreateOpportunityHistoryDto
) => {
  const { data } = await instance.post<IOpportunityHistory>(
    OPPORTUNITY_HISTORY,
    dto
  );
  return data;
};

export const usePostOpportunityHistory = () =>
  useMutation(createOpportunityHistory);
