// seeder should only use for testing purposes

import { getCustomRepository } from 'typeorm';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';

export const seedContacts = async (quantity: number) => {
  const service = new ContactService(getCustomRepository(ContactRepository));
  const numberOfContacts = await service.repository.count();
  // const c;
  if (numberOfContacts >= quantity) return;
  // service.createContact()
};
