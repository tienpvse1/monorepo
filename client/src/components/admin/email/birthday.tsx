import { EmailTemplateType } from '@modules/automation-email-template/dto/create-aet.dto';
import { useCreateAET } from '@modules/automation-email-template/mutation/aet.post';
import { useAET } from '@modules/automation-email-template/query/aet.get';
import { Button } from 'antd';
import { nanoid } from 'nanoid';
import { useRef } from 'react';
import EmailEditor from 'react-email-editor';
interface EmailProps {}

export const BirthdayEmail: React.FC<EmailProps> = ({}) => {
  const { data } = useAET(EmailTemplateType.BIRTHDAY);
  const { mutate } = useCreateAET();
  const emailEditorRef = useRef<EmailEditor>();
  const onLoad = () => {
    if (emailEditorRef.current) emailEditorRef.current.loadDesign(data.design);
  };

  const onSave = () => {
    if (emailEditorRef.current) {
      emailEditorRef.current.exportHtml((data) => {
        const { design, html } = data;
        mutate({
          account_id: nanoid(10),
          design,
          html,
          type: EmailTemplateType.BIRTHDAY,
        });
      });
    }
  };

  return (
    <div>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
      <Button type='primary' onClick={onSave}>
        Save
      </Button>
    </div>
  );
};
