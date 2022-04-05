import { instance } from '@axios';
import { controllers } from '@constance/controllers';
import { handleMutationResponse } from '@modules/base/base.handler';
import { useMutation } from 'react-query';
import { UpdateContactDto, UpdateContactTagsDto } from '../dto/update-contact.dto';

const { CONTACT } = controllers;

const updateContact = async (id: string, contact: UpdateContactDto) => {
  const { data } = await instance.patch(`${CONTACT}/${id}`, contact);
  return data;
};
const updateContactTags = async ({ id, tagIds }: UpdateContactTagsDto) => {
  const { data } = await instance.patch(`${CONTACT}/add-tag/${id}`, { tagIds });
  return data;
};

export const useUpdateContact = (callback?: any) =>
  useMutation(
    ({ id, ...rest }: UpdateContactDto & { id: string }) =>
      updateContact(id, rest),
    {
      ...handleMutationResponse(),
      onSuccess: (data) => callback(data),
    }
  );

export const useUpdateContactTags = () => useMutation(updateContactTags)