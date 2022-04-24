import { useTemplates } from '@modules/email-temlate/query/email-template.get';
import { openNotification } from '@util/notification';
import { Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { Design } from 'react-email-editor';
import { TemplateSelection } from './templates-selection';

interface ITemplateModel {
  modal: string;
  handleLoad: (id: string) => void;
  setModal: Dispatch<SetStateAction<string>>;
  design: Design;
}

export const MyModal: React.FC<ITemplateModel> = ({
  modal,
  handleLoad,
  setModal,
  design,
}) => {
  const { data } = useTemplates();
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
        {data.map((template) => (
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
        okButtonProps={{ style: { display: 'none' } }}
      >
        <TemplateSelection design={design} onClose={handleClose} />
      </Modal>
    </div>
  );
};
