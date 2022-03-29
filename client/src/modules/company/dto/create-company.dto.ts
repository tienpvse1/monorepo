import { ICompany } from "../entity/company.entity";

export interface CreateCompanyDto  extends Partial<ICompany>{
  cityId: string;
}