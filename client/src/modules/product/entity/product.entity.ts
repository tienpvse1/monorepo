import { IBase } from '@interfaces/base';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';

export interface IProduct extends IBase {
  name: string;
  startDate: string | any;
  endDate: string | any;
  price: number;
  pipeline?: IPipeline;
  productAccounts?: any;
}

export interface CourseData {
  id: string;
  name: string;
  code: string;
  startDate: string;
  endDate: string;
  companyId?: any;
  numberOfTrainee: number;
  number_of_trainee: number;
  price: number;
  certificateExp: string;
  courseTypeId: number;
  isActive: boolean;
  isDeleted: boolean;
  course_Detail: course_Detail[];
  course_detail: course_Detail[];
}

export interface subjectDetail {
  code: string;
  isActive: boolean;
  name: string;
  id: string;
}

export interface course_Detail {
  courseId: number;
  duration: number;
  id: number;
  isActive: boolean;
  subjectDetail: subjectDetail;
}

export interface Paging {
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface ICourse {
  data: CourseData[];
  paging: Paging;
  count: number;
  page: number;
  pageCount: number;
  total: number
}
