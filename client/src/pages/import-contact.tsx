import { lazy, Suspense, useState } from 'react';
import Upload from '@common/upload';
import { Loading } from '@components/loading/loading';
import { useContacts } from '@modules/contact/query/contact.get';
const AssignDataTable = lazy(
  () => import('@components/import-contact/assign-data-table')
);
import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { useCookies } from 'react-cookie';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Steps } from 'antd';
import {
  BuildOutlined,
  CheckOutlined,
  FileOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import PreviewTable from '@components/import-contact/preview-table';
import { Is } from '@common/is';
const { Step } = Steps;
const ImportContact: React.FC = () => {
  const [importedContacts, setImportedContacts] = useState<CreateContactDto[]>(
    []
  );
  const [previewContacts, setPreviewContacts] = useState<CreateContactDto[]>(
    []
  );
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data: contacts } = useContacts(id);
  return (
    <div className='container-page'>
      <Steps>
        <Step
          status={importedContacts.length > 0 ? 'finish' : 'process'}
          title='Import'
          icon={<FileOutlined />}
        />
        <Step
          status={previewContacts.length > 0 ? 'finish' : 'wait'}
          title='Verification'
          icon={<SolutionOutlined />}
        />

        <Step
          status={previewContacts.length > 0 ? 'process' : 'wait'}
          title='Choose company'
          icon={<BuildOutlined />}
        />
        <Step status={'wait'} title='Done' icon={<CheckOutlined />} />
      </Steps>
      <Is condition={importedContacts.length === 0}>
        <Upload setImportedContacts={setImportedContacts} contacts={contacts} />
      </Is>
      {importedContacts.length > 0 && previewContacts.length === 0 && (
        <Suspense fallback={<Loading />}>
          <AssignDataTable
            contacts={importedContacts}
            setPreviewContacts={setPreviewContacts}
          />
        </Suspense>
      )}
      {previewContacts.length > 0 && (
        <Suspense fallback={<Loading />}>
          <PreviewTable
            previewData={previewContacts}
            setPreviewData={setPreviewContacts}
          />
        </Suspense>
      )}
    </div>
  );
};

export default ImportContact;
