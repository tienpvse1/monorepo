export interface IProvinces {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: IDistricts[]
}

export interface IDistricts {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
}