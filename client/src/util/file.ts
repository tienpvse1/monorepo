import { instance } from '@axios';
import imageCompression from 'browser-image-compression';
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

export const compressImage = async (image: File, sizeMB: number) => {
  const options = {
    maxSizeMB: sizeMB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(image, options);

    return new File([compressedFile], `${compressedFile.name}.png`, {
      type: 'image/png',
    });
  } catch (error) {}
};
