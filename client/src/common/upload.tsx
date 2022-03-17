import { InboxOutlined } from '@ant-design/icons';
import WarningModal from '@components/contact/warning-modal';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { IContact } from '@modules/contact/entity/contact.entity';
import { useContacts } from '@modules/contact/query/contact.get';
import { readExcel } from '@util/excel';
import { Modal } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import Dragger from 'antd/lib/upload/Dragger';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
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
  const [error, setError] = useState<{ message: string; id: string }[]>([]);
  const [unValidatedData, setUnValidatedData] = useState<
    (CreateContactDto & { id: string })[]
  >([]);
  const [
    {
      public_user_info: { id: accountId },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data: dbContacts } = useContacts(accountId);

  const validateContactsFromDb = (
    contacts: (CreateContactDto & { __rowNum__: number; id: string })[]
  ) => {
    const errors: { message: string; id: string }[] = [];
    if (!dbContacts) return [];
    for (const contact of contacts) {
      dbContacts.forEach((item) => {
        if (item.email === contact.email) {
          errors.push({
            message: `email duplicated with another contacts from database at row ${contact.__rowNum__}`,
            id: contact.id,
          });
        }
      });
    }
    return errors;
  };
  const validateContactsInFile = (
    contacts: (CreateContactDto & { __rowNum__: number; id: string })[]
  ) => {
    const errors: { message: string; id: string }[] = [];
    const emails = contacts.map((contact) => contact.email);
    if (!dbContacts) return [];
    let index = 0;
    for (const email of emails) {
      const indices = [];
      let idx = emails.indexOf(email);
      while (idx != -1) {
        indices.push(idx);
        idx = emails.indexOf(email, idx + 1);
      }
      if (indices.length > 1)
        errors.push({
          message: `email duplicate at row ${contacts[index].__rowNum__}`,
          id: contacts[index].id,
        });
      index++;
    }
    return errors;
  };

  const handleChange = async (info: UploadChangeParam<any>) => {
    const excelData = await readExcel(info.file);
    const data = excelData.map(
      ({ company, ...item }) =>
        ({ ...item, companyName: company } as CreateContactDto & {
          __rowNum__: number;
          id: string;
        })
    );
    setUnValidatedData(data);
    const errors = validateContactsFromDb(data);
    const inFileError = validateContactsInFile(data);
    const totalErrors = [...errors, ...inFileError];
    if (errors && errors.length > 0) setError(totalErrors);
    else {
      setImportedContacts(data);
    }

    // setImportedContacts(data);
  };
  const onOk = () => {
    setImportedContacts(
      unValidatedData.filter((item) => {
        for (const errorItem of error) {
          if (errorItem.id === item.id) return false;
        }
        return true;
      })
    );
  };
  return (
    <>
      <Modal
        okText='remove above rows'
        cancelText='import other files'
        visible={error.length > 0}
        onCancel={() => setError([])}
        onOk={onOk}
      >
        <WarningModal errors={error} setErrors={setError} />
      </Modal>

      <Dragger
        name='file'
        style={{
          height: '90vh',
        }}
        multiple={false}
        maxCount={1}
        beforeUpload={() => false}
        onChange={(info) => handleChange(info)}
        accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
      >
        <div
          style={{
            height: '70vh',
          }}
        >
          <p className='ant-upload-drag-icon'>
            <InboxOutlined
              style={{
                fontSize: 100,
                marginTop: '20vh',
              }}
            />
          </p>
          <p className='ant-upload-text'>
            Click or drag file to this area to upload
          </p>
          <p className='ant-upload-hint'>
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </div>
      </Dragger>
    </>
  );
};
export default Upload;
