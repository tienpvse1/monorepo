import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { client } from '../../../App';
import { CreateContactDto } from '../dto/create-contact.dto';
import { Contact } from '../entity/contact.entity';
import { QUERY_CONTACTS } from '../query/contact.get';

const { CONTACT } = controllers;

export const insertContact = async (contact: CreateContactDto) => {
  const { data } = await instance.post<Contact>(CONTACT, contact);
  return data;
};

export const bulkInsertContacts = async (bulk: { bulk: CreateContactDto[] }) => {
  const { data } = await instance.post<Contact[]>(`${CONTACT}/bulk`, bulk);
  return data;
};
export const useInsertContact = () => useMutation(insertContact);
export const useBulkInsertContact = () => useMutation(bulkInsertContacts);
