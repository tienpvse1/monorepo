import { IEmailTemplate } from '@modules/email-temlate/entity/email-template.entity';
import { openNotification } from '@util/notification';
import { Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { Design } from 'react-email-editor';
import { TemplateSelection } from './templates-selection';

interface ITemplateModel {
  modal: string;
  templates: IEmailTemplate[];
  handleLoad: (id: string) => void;
  setModal: Dispatch<SetStateAction<string>>;
  design: Design;
}

export const MyModal: React.FC<ITemplateModel> = ({
  modal,
  templates,
  handleLoad,
  setModal,
  design,
}) => {
  const handleClose = () => {
    setModal('');
    openNotification('success', 'Your email have updated successfully');
  };
  return (
    <div>
      <Modal
        title='Your templates...'
        visible={modal === 'selectTemplate'}
        onCancel={() => setModal('false')}
      >
        {templates.map((template) => (
          <p
            style={{ cursor: 'pointer' }}
            key={template.id}
            onClick={() => {
              handleLoad(template?.id || ''), setModal('false');
            }}
          >
            {template.name}
          </p>
        ))}
      </Modal>
      <Modal
        title='Save your template'
        visible={modal === 'saveTemplate'}
        onCancel={() => setModal('false')}
      >
        <TemplateSelection design={design} onClose={handleClose} />
      </Modal>
    </div>
  );
};
