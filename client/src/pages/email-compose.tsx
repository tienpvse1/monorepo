import {
  errorProps,
  warningProps,
} from '@components/email-compose/confirm-modal';
import { MyModal } from '@components/email-compose/templates-model';
import { useDebounce } from '@hooks/debounce';
import { getContactsEmailLike } from '@modules/contact/query/contact.get';
import { getTemplateById } from '@modules/email-temlate/query/email-template.get';
import { useSendEmail } from '@modules/email/mutate/email.post';
import { useTagsLike } from '@modules/tag/query/tag.get';
import { openNotification } from '@util/notification';
import { Button, Input, Modal, Select, Spin } from 'antd';
import { Suspense, useRef, useState } from 'react';
import EmailEditor, { Design } from 'react-email-editor';
import { useQuery } from 'react-query';

const EmailCompose: React.FC = () => {
  // necessary state
  const [searchKey, setSearchKey] = useState('');

  const debouncedFilter = useDebounce(searchKey, 500);

  const { data: dataSource } = useQuery(
    ['query-contact-like-email', debouncedFilter],
    () => getContactsEmailLike(debouncedFilter),
    {
      placeholderData: [],
      enabled: Boolean(debouncedFilter),
    }
  );

  const { data: tags } = useTagsLike(debouncedFilter);
  const emailEditorRef = useRef<EmailEditor>(null);
  const [to, setTo] = useState<any>('');
  const [targets, setTargets] = useState<string[]>([]);
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
  const sendEmail = () => {
    if (emailEditorRef.current) {
      emailEditorRef.current.exportHtml((design) => {
        mutate({
          subject,
          to: targets.map((item) => ({ email: item, isTag: false })),
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
      <Suspense fallback={<Spin size='default' />}>
        <MyModal
          modal={currentModal}
          handleLoad={handleLoad}
          setModal={setCurrentModal}
          design={design!}
        />
      </Suspense>
      {/* <AutoComplete dataSource={dataSource} /> */}
      <span style={{fontSize: '16px'}}>To: </span>
      <Select
        style={{ width: '100%' }}
        mode='multiple'
        onSearch={(e) => {
          setSearchKey(e);
          setTo(e);
        }}
        onSelect={(value: string) => setTargets((prev) => [...prev, value])}
        onDeselect={(value: string) =>
          setTargets((prev) => prev.filter((item) => item !== value))
        }
        onChange={(value: string) => {
          setTo(value);
        }}
      >
        <Select.OptGroup label='Contacts'>
          {dataSource?.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select.OptGroup>
        <Select.OptGroup label='Group of contacts'>
          {tags?.map((tag) => (
            <Select.Option key={tag.name}>{tag.name}</Select.Option>
          ))}
        </Select.OptGroup>
      </Select>
      <br/>
      <span style={{fontSize: '16px'}}>Subject:</span>
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
            warningProps(`${to.join(', ')}`, sendEmail)
          );
        }}
        type='primary'
        danger
        disabled={to.length <= 0}
        loading={isLoading}
      >
        Send
      </Button>
      {contextHolder}
    </>
  );
};

export default EmailCompose;
