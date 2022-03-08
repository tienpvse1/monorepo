import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { useMutation } from 'react-query';
import { UpdateContactDto } from '../dto/update-contact.dto';

const { CONTACT } = controllers;

const updateContact = async (id: string, contact: UpdateContactDto) => {
  const { data } = await instance.patch(`${CONTACT}/${id}`, contact);
  return data;
};

export const useUpdateContact = (callback?: any) =>
  useMutation(
    ({ id, ...rest }: UpdateContactDto & { id: string }) =>
      updateContact(id, rest),
    {
      onSuccess: () => callback(),
    }
  );
