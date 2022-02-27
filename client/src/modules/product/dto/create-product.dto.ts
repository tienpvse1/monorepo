import { IBase } from "@interfaces/base";
export interface ICreateProductDto extends IBase {
  startDate: string;
  endDate: string;
  name: string;
  price: number;
}