import {
  errorProps,
  warningProps,
} from '@components/email-compose/confirm-modal';
import { MyModal } from '@components/email-compose/templates-model';
import { Loading } from '@components/loading/loading';
import { useDebounce } from '@hooks/debounce';
import {
  getContactsEmailLike,
  useContactsWithEmailLike,
} from '@modules/contact/query/contact.get';
import { IEmailTemplate } from '@modules/email-temlate/entity/email-template.entity';
import {
  findAllTemplates,
  getTemplateById,
} from '@modules/email-temlate/query/email-template.get';
import { useSendEmail } from '@modules/email/mutate/email.post';
import { openNotification } from '@util/notification';
import { AutoComplete, Button, Input, Modal } from 'antd';
import { useRef, useState } from 'react';
import EmailEditor, { Design } from 'react-email-editor';
import { useQuery } from 'react-query';
const EmailCompose: React.FC = () => {
  // necessary state
  const [searchKey, setSearchKey] = useState(undefined);

  const debouncedFilter = useDebounce(searchKey, 500);

  const { data: dataSource } = useQuery(
    ['query-contact-like-email', debouncedFilter],
    () => getContactsEmailLike(debouncedFilter),
    {
      enabled: Boolean(debouncedFilter),
    }
  );
  const emailEditorRef = useRef<EmailEditor>(null);
  const [templates, setTemplates] = useState<IEmailTemplate[]>([]);
  const [to, setTo] = useState('');
  const [design, setDesign] = useState<Design>();
  const [subject, setSubject] = useState('');
  const [currentModal, setCurrentModal] = useState('');
  const [modal, contextHolder] = Modal.useModal();

  const handleError = () => {
    modal.error(errorProps('cannot send email', Modal.destroyAll));
  };

  const { mutate, isLoading } = useSendEmail(handleError);

  // this function will handle when use hit send button
  // every content will be convert to html and send via gmail
  const exportHTML = () => {
    if (emailEditorRef.current) {
      emailEditorRef.current.exportHtml((design) => {
        mutate({
          subject,
          to,
          value: design.html,
        });
      });
    }
  };

  // this is still in experiment
  // save the current template as a new one to database]
  // TODO: if the current template has exist in database, update it only

  // load all saved template from database and apply to the modal
  const handleLoad = async (id: string) => {
    if (!emailEditorRef.current) return;
    const data = await getTemplateById(id);
    emailEditorRef.current.loadDesign(data.design);
    openNotification(
      'Notification',
      'Email template have been loaded successfully'
    );
  };

  // when user choose an template form modal
  // its template from database will be apply to the database
  const loadTemplates = async () => {
    const data = await findAllTemplates();

    setTemplates(data);
    setCurrentModal('selectTemplate');
  };

  const handleSaveTemplate = () => {
    if (!emailEditorRef.current) return;
    emailEditorRef.current.saveDesign((design) => {
      setDesign(design);
      setCurrentModal('saveTemplate');
    });
  };

  return (
    <>
      <MyModal
        templates={templates}
        modal={currentModal}
        handleLoad={handleLoad}
        setModal={setCurrentModal}
        design={design!}
      />
      <AutoComplete
        style={{ width: '100%' }}
        onChange={(e) => {
          setSearchKey(e);
          setTo(e);
        }}
        placeholder={'To'}
        notFoundContent={
          <Loading
            coverWidth={'100%'}
            coverHeight={180}
            loadingHeight={40}
            loadingWidth={40}
          />
        }
        dataSource={dataSource}
        filterOption={() => true}
      />

      <Input
        placeholder='Email subject'
        onChange={(e) => setSubject(e.target.value)}
        type='email'
      />

      <EmailEditor
        ref={emailEditorRef}
        options={{
          customCSS: [
            'https://examples.unlayer.com/examples/custom-css/custom.css',
          ],
        }}
        appearance={{
          theme: 'light',
        }}
      />
      <Button
        onClick={handleSaveTemplate}
        style={{
          marginRight: 12,
        }}
        type='primary'
        danger
      >
        Save
      </Button>
      <Button
        onClick={loadTemplates}
        style={{
          marginRight: 12,
        }}
        type='primary'
        danger
      >
        Load
      </Button>
      <Button
        style={{
          marginRight: 12,
        }}
        onClick={() => {
          modal.warning(
            warningProps(`this email will be sent to ${to}`, exportHTML)
          );
        }}
        type='primary'
        danger
        disabled={to.length > 0}
        loading={isLoading}
      >
        Send
      </Button>
      {contextHolder}
    </>
  );
};

export default EmailCompose;
