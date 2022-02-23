import { instance } from '@axios';

export interface UploadFileResponse {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export const uploadFiles = async (files: File[]) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const form = new FormData();
  files.forEach((file) => form.append('files', file));
  const { data } = await instance.post<UploadFileResponse[]>(
    'file/upload',
    form,
    {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
  );
  return data;
};
