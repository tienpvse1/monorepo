import { Axios } from '@axios';
import { controllers } from '@constance/controllers';
import { Design } from 'react-email-editor';
import { useMutation } from 'react-query';
import { client } from '../../../App';
import { IEmailTemplate } from '../entity/email-template.entity';
import { FETCH_TEMPLATES_KEY } from '../query/email-template.get';

const { EMAIL_TEMPLATE } = controllers;

export const createTemplate = async ({
  design,
  name,
}: {
  design: Design;
  name: string;
}) => {
  const { instance } = new Axios();
  const { data } = await instance.post(`${EMAIL_TEMPLATE}`, { name, design });
  return data;
};

export const usePostEmailTemplate = () =>
  useMutation(createTemplate, {
    onMutate: async (newItem: IEmailTemplate) => {
      await client.cancelQueries(FETCH_TEMPLATES_KEY);
      const previousItems =
        client.getQueryData<IEmailTemplate[]>(FETCH_TEMPLATES_KEY);
      if (previousItems) {
        client.setQueryData<IEmailTemplate[]>(FETCH_TEMPLATES_KEY, [
          ...previousItems,
          { ...newItem, id: Date.now().toString() },
        ]);
        return { previousItems };
      } else {
        const something = [
          {
            ...newItem,
            id: Date.now().toString(),
          },
        ];
        client.setQueryData<IEmailTemplate[]>(FETCH_TEMPLATES_KEY, something);
        return { previousItems: something };
      }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousItems) {
        client.setQueryData<IEmailTemplate[]>(
          FETCH_TEMPLATES_KEY,
          context.previousItems
        );
      }
    },
    onSettled: () => {
      client.invalidateQueries(FETCH_TEMPLATES_KEY);
    },
  });
