export class CreateCityDto {
  city: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
  admin_name: string;
  capital: string;
  population: string;
  population_proper: string;
}

export class ParsedCreateCityDto {
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
