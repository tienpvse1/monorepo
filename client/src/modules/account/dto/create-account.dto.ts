export interface ICreateAccountDto {
  photo: 'string';
  firstName: 'string';
  lastName: 'string';
  email: 'string';
  password: 'string';
  city?: string;
  zipCode?: number;
  state?: string;
  country?: string;
}
