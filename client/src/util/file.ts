import { instance } from '@axios';

export const uploadFiles = async (files: File[]) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const form = new FormData();
  files.forEach((file) => form.append('files', file));
  const result = await instance.post('file/upload', form, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return result;
};
