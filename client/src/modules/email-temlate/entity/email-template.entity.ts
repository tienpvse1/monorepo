import { Design } from 'react-email-editor';

export interface IEmailTemplate {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name: string;
  design: Design;
}
