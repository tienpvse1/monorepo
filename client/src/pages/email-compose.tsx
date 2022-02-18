import {
  errorProps,
  warningProps,
} from '@components/email-compose/confirm-modal';
import { MyModal } from '@components/email-compose/templates-model';
import { IEmailTemplate } from '@modules/email-temlate/entity/email-template.entity';
import {
  findAllTemplates,
  getTemplateById,
} from '@modules/email-temlate/query/email-template.get';
import { useSendEmail } from '@modules/email/mutate/email.post';
import { openNotification } from '@util/notification';
import { Button, Input, Modal } from 'antd';
import { useRef, useState } from 'react';
import EmailEditor, { Design } from 'react-email-editor';
const EmailCompose: React.FC = () => {
  // necessary state
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

      <Input placeholder='to' onChange={(e) => setTo(e.target.value)} />
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
