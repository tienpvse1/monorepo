import { instance } from '@axios';
import { COURSE_SERVICE_TOKEN } from '@components/login/login-form';
import { controllers } from '@constance/controllers';
import { getCookies } from '@cookies';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ICourse, IProduct } from '../entity/product.entity';
const { PRODUCT } = controllers;
export const getAllProduct = async () => {
  const { data } = await instance.get<IProduct[]>(`${PRODUCT}`);
  return data;
};

export const useQueryProducts = () => useQuery(PRODUCT, getAllProduct);

export const getCourses = async (search = '', size = 10, index = 1) => {
  const token = getCookies(COURSE_SERVICE_TOKEN);
  const { data } = await axios.get<ICourse>(
    `http://smapi.hisoft.vn/api/course?index=${index}&size=${size}&name=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const useCourses = (search = '', size = 10, index = 1) =>
  useQuery('get-course', () => getCourses(search, size, index));
