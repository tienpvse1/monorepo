import { lazy, Suspense, useState } from 'react';
import Upload from '@common/upload';
import { Loading } from '@components/loading/loading';
import { useContacts } from '@modules/contact/query/contact.get';
const PreviewContactTable = lazy(
  () => import('@components/import-contact/preview-contact-table')
);
import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { useCookies } from 'react-cookie';
import { PUBLIC_USER_INFO } from '@constance/cookie';

const ImportContact: React.FC = () => {
  const [importedContacts, setImportedContacts] = useState<CreateContactDto[]>(
    []
  );
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data: contacts } = useContacts(id);
  return (
    <div>
      {importedContacts.length <= 0 ? (
        <Upload setImportedContacts={setImportedContacts} contacts={contacts} />
      ) : (
        <Suspense fallback={<Loading />}>
          <PreviewContactTable
            contacts={importedContacts}
            setContacts={setImportedContacts}
          />
        </Suspense>
      )}
    </div>
  );
};

export default ImportContact;
