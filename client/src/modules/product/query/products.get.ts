import { instance } from '@axios';
import { COURSE_SERVICE_TOKEN } from '@components/login/login-form';
import { controllers } from '@constance/controllers';
import { getCookies } from '@cookies';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import axios from 'axios';
import { useQuery } from 'react-query';
import { CourseData, ICourse, IProduct } from '../entity/product.entity';
const { PRODUCT, COURSE } = controllers;

export const QUERY_COURSES = 'query-courses';
export const QUERY_MY_COURSES = 'query-my-courses';
export const getAllProduct = async () => {
  const { data } = await instance.get<IProduct[]>(`${PRODUCT}`);
  return data;
};

export const useQueryProducts = () => useQuery(PRODUCT, getAllProduct);

export const getCourses = async (search = '', size = 10, index = 1) => {
  const token = getCookies(COURSE_SERVICE_TOKEN)[0]['course-service-token'];

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

export const getMyCourses = async (search = '', size = 10, page = 1) => {
  const query = RequestQueryBuilder.create({
    offset: page * (size - 1),
    page: page,
    limit: size,
    search: {
      name: {
        $cont: search
      }
    }
  }).query(false);

  const { data } = await instance.get<ICourse>(`${COURSE}?${query}`);
  return data;
};

export const getCoursesById = async (code: string, size = 10, index = 1) => {
  const token = getCookies(COURSE_SERVICE_TOKEN)[0]['course-service-token'];

  const { data } = await axios.get<ICourse>(
    `http://smapi.hisoft.vn/api/course?index=${index}&size=${size}&code=${code}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const useCourses = (search = '', size = 10, index = 1) =>
  useQuery([QUERY_COURSES, search, size, index], () =>
    getCourses(search, size, index)
  );

export const useMyCourses = (search = '', size = 10, index = 1) =>
  useQuery([QUERY_MY_COURSES, search, size, index], () =>
    getMyCourses(search, size, index)
  );

export const getMyCoursesById = async (courseId: string) => {
  const { data } = await instance.get<CourseData>(`${COURSE}/${courseId}`);
  return data;
}

export const useQueryMyCoursesById = (courseId: string) =>
  useQuery([QUERY_COURSES, courseId], () => getMyCoursesById(courseId), {
    enabled: Boolean(courseId)
  })