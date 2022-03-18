import { IImportedContact } from '@modules/contact/dto/create-contact.dto';
import { RcFile } from 'antd/lib/upload';
import { nanoid } from 'nanoid';
import { read, utils } from 'xlsx';

export const readExcel = async (file: File | RcFile) => {
  const data = await file.arrayBuffer();
  const workbook = read(data);
  const sheets = workbook.SheetNames;
  const xlData = utils.sheet_to_json<IImportedContact & { __rowNum__: number }>(
    workbook.Sheets[sheets[0]]
  );

  const mapped = xlData.map((data) => ({
    ...data,
    id: nanoid(5),
    __rowNum__: data.__rowNum__ + 1,
  }));

  return mapped;
};
