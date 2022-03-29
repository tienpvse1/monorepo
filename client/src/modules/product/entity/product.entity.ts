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

export interface Data {
  id: number;
  name: string;
  code: string;
  startDate: string;
  endDate: string;
  companyId?: any;
  numberOfTrainee: number;
  courseTypeId: number;
  isActive: boolean;
  isDeleted: boolean;
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
  data: Data[];
  paging: Paging;
}
