export interface ICreateAccountDto {
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city?: string;
  postalCode?: number;
  state?: string;
  country?: string;
}
