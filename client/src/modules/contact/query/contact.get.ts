import { Axios } from '@axios';
import { controllers } from '@constance/controllers';
import { useQuery } from 'react-query';
import { Contact } from '../entity/contact.entity';

const { CONTACT } = controllers;

export const QUERY_CONTACTS = 'query-contacts';
const getContacts = async () => {
  const { instance } = new Axios();
  const { data } = await instance.get<Contact[]>(`${CONTACT}`);
  console.log(data);

  return data;
};

export const useContacts = () => useQuery(QUERY_CONTACTS, getContacts);
