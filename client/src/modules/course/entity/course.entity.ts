import { IBase } from '@interfaces/base';

export interface ICourse extends IBase {
  name: string;
  startDate: string;
  endDate: string;
  code: string;
  price: number;
  isEnable: boolean;
}
