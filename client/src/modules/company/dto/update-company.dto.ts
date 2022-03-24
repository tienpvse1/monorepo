import { ICompany } from "../entity/company.entity";

export interface UpdateCompanyDto  extends Partial<ICompany>{}