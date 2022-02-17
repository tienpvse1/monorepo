import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { RcFile } from 'antd/lib/upload';
import { read, utils } from 'xlsx';

export const readExcel = async (file: File | RcFile) => {
  const data = await file.arrayBuffer();
  const workbook = read(data);
  const sheets = workbook.SheetNames;
  var xlData = utils.sheet_to_json<CreateContactDto>(
    workbook.Sheets[sheets[0]]
  );
  return xlData;
};
