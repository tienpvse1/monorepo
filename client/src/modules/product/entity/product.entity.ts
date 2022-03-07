import { IBase } from "@interfaces/base";
import { IPipeline } from "@modules/pipeline/entity/pipeline.entity";

export interface IProduct extends IBase{
  name: string;
  startDate: string | any;
  endDate: string | any;
  price: number;
  pipeline?: IPipeline;
  productAccounts?: any;
}