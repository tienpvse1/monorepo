import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useQuery } from 'react-query';
import { ICourse } from '../entity/course.entity';

const { COURSE } = controllers;
export const QUERY_COURSES = 'query-courses';
export const getAllCourses = async () => {
  const { data } = await instance.get<ICourse[]>(COURSE);
  return data;
};

export const useCourses = () =>
  useQuery(QUERY_COURSES, getAllCourses, {
    placeholderData: [],
  });
