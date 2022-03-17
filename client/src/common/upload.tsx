import { InboxOutlined } from '@ant-design/icons';
import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { IContact } from '@modules/contact/entity/contact.entity';
import { readExcel } from '@util/excel';
import { UploadChangeParam } from 'antd/lib/upload';
import Dragger from 'antd/lib/upload/Dragger';
import '../stylesheets/upload.css';
interface UploadProps {
  contacts: IContact[];
  setImportedContacts: React.Dispatch<React.SetStateAction<CreateContactDto[]>>;
}
export interface Message {
  message: string;
  resolved: boolean;
  id: string;
}
const Upload: React.FC<UploadProps> = ({ contacts, setImportedContacts }) => {
  const handleChange = async (info: UploadChangeParam<any>) => {
    const data = await readExcel(info.file);
    console.table(data);
    // setImportedContacts(data);
  };
  return (
    <>
      <Dragger
        name='file'
        style={{
          height: '90vh',
        }}
        beforeUpload={() => false}
        onChange={(info) => handleChange(info)}
        accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
      >
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>
          Click or drag file to this area to upload
        </p>
        <p className='ant-upload-hint'>
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </>
  );
};
export default Upload;
