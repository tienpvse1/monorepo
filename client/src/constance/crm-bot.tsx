import { IAccount } from '@interfaces/account';
import { Role } from '@interfaces/type-roles';
import { nanoid } from 'nanoid';

export const CRM_BOT: Partial<IAccount> = {
  firstName: 'CRM',
  lastName: 'Bot',
  photo: 'https://cdn-icons-png.flaticon.com/512/5968/5968756.png',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'crmbot@gmail.com',
  role: {
    id: nanoid(5),
    createdAt: new Date().toString(),
    deletedAt: null,
    name: Role.SYSTEM,
    updatedAt: new Date().toString(),
  },
};

export const EMAIL_BOT: Partial<IAccount> = {
  firstName: 'Gmail',
  lastName: '',
  photo: 'https://cdn-icons-png.flaticon.com/512/5968/5968534.png',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'gmail@gmail.com',
  role: {
    id: nanoid(5),
    createdAt: new Date().toString(),
    deletedAt: null,
    name: Role.SYSTEM,
    updatedAt: new Date().toString(),
  },
};
