import { InboxOutlined } from '@ant-design/icons';
import { Loading } from '@components/loading/loading';
import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { IContact } from '@modules/contact/entity/contact.entity';
import { removeDuplicate } from '@util/array';
import { readExcel } from '@util/excel';
import { Modal } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import Dragger from 'antd/lib/upload/Dragger';
import { lazy, Suspense, useState } from 'react';
import '../stylesheets/upload.css';
const WarningModal = lazy(() => import('@components/contact/warning-modal'));
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
  const [errors, setErrors] = useState<Message[]>([]);
  const [warnings, setWarnings] = useState<Message[]>([]);
  const [data, setData] = useState<CreateContactDto[]>();
  const validateData = (
    data: (CreateContactDto & {
      __rowNum__: number;
    })[]
  ) => {
    const errorMessages: Message[] = [];
    const warningMessages: Message[] = [];
    data = removeDuplicate<
      CreateContactDto & {
        __rowNum__: number;
      }
    >(data, 'email');
    data = removeDuplicate<
      CreateContactDto & {
        __rowNum__: number;
      }
    >(data, 'taxId');
    for (const { email, taxId, __rowNum__, id } of data) {
      if (contacts.some((item) => item.email === email))
        warningMessages.push({
          message: `email existed at row ${__rowNum__}, item ${email}`,
          resolved: false,
          id,
        });

      if (contacts.some((item) => item.taxId === taxId))
        errorMessages.push({
          message: `tax id existed at row ${__rowNum__}, item ${taxId}`,
          resolved: false,
          id,
        });
    }

    setErrors(errorMessages);
    setWarnings(warningMessages);
  };
  const handleChange = async (info: UploadChangeParam<any>) => {
    const data = await readExcel(info.file);
    validateData(data);
    console.log(data);
    setData(data);
    // setImportedContacts(data);
  };

  const onOk = () => {
    const filtered = data.filter((item) => {
      const found = warnings.find((warning) => warning.id === item.id);
      const foundError = errors.find((error) => error.id === item.id);
      if (foundError) return false;
      if (!found) return true;
      if (found.resolved) return true;
      return false;
    });
    setErrors([]);
    setWarnings([]);
    const removedDuplicateEmail = removeDuplicate<CreateContactDto>(
      filtered,
      'email'
    );
    const removedDuplicateTaxId = removeDuplicate<CreateContactDto>(
      removedDuplicateEmail,
      'taxId'
    );
    setImportedContacts(removedDuplicateTaxId);
  };

  const onCancel = () => {
    setErrors([]);
    setWarnings([]);
  };

  return (
    <>
      <Modal
        title='Check below'
        visible={errors.length > 0 || warnings.length > 0}
        onOk={onOk}
        onCancel={() => onCancel()}
        okButtonProps={{
          disabled: errors.some((item) => item.resolved === false),
        }}
      >
        <Suspense fallback={<Loading />}>
          <WarningModal
            setWarnings={setWarnings}
            setErrors={setErrors}
            errors={errors}
            warnings={warnings}
          />
        </Suspense>
      </Modal>

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
