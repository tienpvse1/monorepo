import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { CreateContactDto } from '../dto/create-contact.dto';
import { IContact } from '../entity/contact.entity';

const { CONTACT } = controllers;

export const insertContact = async (contact: CreateContactDto) => {
  const { data } = await instance.post<IContact>(CONTACT, contact);
  return data;
};

export const bulkInsertContacts = async (bulk: {
  bulk: CreateContactDto[];
}) => {
  const { data } = await instance.post<IContact[]>(`${CONTACT}/bulk`, bulk);
  return data;
};
export const useInsertContact = (onSuccess: any) => useMutation(insertContact, {
  onSuccess,
});
export const useBulkInsertContact = () => useMutation(bulkInsertContacts);
