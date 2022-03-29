import { IBase } from "@interfaces/base";

export interface IProvinces extends IBase{
  city: string;
  lat: number;
  lng: number;
  country: string;
  iso2: string;
  admin_name: string;
  capital: string;
  population: number;
  population_proper: number;
}