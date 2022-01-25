import { IColumnName } from "./column-name";

export interface ITableTopSalesRep {
  name: IColumnName;
  amount: number;
  product: number;
  premium: number;
  rank: string;
}
