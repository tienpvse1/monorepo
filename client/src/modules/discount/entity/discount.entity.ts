import { IBase } from "@interfaces/base";

export interface IDiscount extends IBase {
  applied: boolean;
  discountAmount: number;
  expireAt: string;
  name: string;
}