import { controllers } from "@constance/controllers";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { IProvinces } from "../entity/provinces.entity";
import { instance as instance2 } from '@axios';
import { removeDuplicate } from "@util/array";
const { CITY } = controllers;

export const searchCity = async (text: string) => {
  const query = RequestQueryBuilder.create({
    search: {
      'admin_name': {
        $cont: text
      },
    }
  }).query(false);
  const { data } = await instance2.get<IProvinces[]>(`${CITY}?${query}`);

  return removeDuplicate(data, 'admin_name');
};

export const getStateByCity = async (cityName: string) => {
  const query = RequestQueryBuilder.create({
    filter: [
      {
        field: 'admin_name',
        operator: '$eq',
        value: cityName,
      },
    ],
  }).query(false);
  const { data } = await instance2.get<IProvinces[]>(`${CITY}?${query}`);

  return removeDuplicate(data, 'city').filter((value) => value.capital === 'minor');
};