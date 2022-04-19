import { EmailTemplateType } from '@modules/automation-email-template/dto/create-aet.dto';
import { useAET } from '@modules/automation-email-template/query/aet.get';
import { useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';
interface EmailProps {}

export const BirthdayEmail: React.FC<EmailProps> = ({}) => {
  const { data } = useAET(EmailTemplateType.BIRTHDAY);

  const emailEditorRef = useRef<EmailEditor>();
  const onLoad = () => {
    if (emailEditorRef.current) emailEditorRef.current.loadDesign(data.design);
  };

  return (
    <div>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
    </div>
  );
};
