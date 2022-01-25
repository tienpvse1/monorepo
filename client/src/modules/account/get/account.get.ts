import { Axios } from '../../../axios';
import { controllers } from '../../../constance/controllers';

const { ACCOUNT } = controllers;
export const getUser = async () => {
  const { instance } = new Axios();
  const { data } = await instance.get(`${ACCOUNT}/custom`, {
    data: {},
  });
  return data;
};
