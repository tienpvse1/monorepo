import { instance } from "@axios";
import { controllers } from "@constance/controllers";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { useQuery } from "react-query";
import { IDiscount } from "../entity/discount.entity";
const { DISCOUNT_CODE } = controllers;

export const getDiscount = async () => {
  const query = RequestQueryBuilder.create({
    join: [
      { field: 'pipelineItem' },
    ]
  }).query(false);
  
  const { data } = await instance.get<IDiscount[]>(`${DISCOUNT_CODE}?${query}`);
  return data;
};

export const useQueryDiscount = () =>
  useQuery(DISCOUNT_CODE, () => getDiscount());