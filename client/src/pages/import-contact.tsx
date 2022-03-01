import { lazy, Suspense, useState } from 'react';
import Upload from '@common/upload';
import { Loading } from '@components/loading/loading';
const PreviewContactTable = lazy(
  () => import('@components/import-contact/preview-contact-table')
);
import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';

const ImportContact: React.FC = () => {
  const [contacts, setContacts] = useState<CreateContactDto[]>([]);
  return (
    <div>
      {contacts.length <= 0 ? (
        <Upload setContacts={setContacts} />
      ) : (
        <Suspense fallback={<Loading />}>
          <PreviewContactTable contacts={contacts} setContacts={setContacts} />
        </Suspense>
      )}
    </div>
  );
};

export default ImportContact;
