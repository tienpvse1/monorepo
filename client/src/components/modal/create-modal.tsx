import { Form, FormInstance, Modal } from 'antd';

interface CreateModalProps {
  isOpenModal: boolean;
  toggleCreateModal: () => void;
  callback?: (record: any, form?: FormInstance<any>) => void;
  width?: number;
  title: string;
  bodyStyle?: React.CSSProperties;
  hasForm?: boolean;
  hasSubmitMethod?: () => void;
  autoToggleModel?: boolean;
  autoResetFields?: boolean;
  destroyOnClose?: boolean;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpenModal,
  toggleCreateModal,
  children,
  callback,
  width = 1000,
  title,
  bodyStyle,
  hasForm = false,
  hasSubmitMethod,
  autoToggleModel = true,
  autoResetFields = true,
  destroyOnClose = false
}) => {
  const [form] = Form.useForm<any>();

  const handleSubmit = async () => {
    const record = await form.validateFields();
    callback(record, form);
    autoToggleModel && toggleCreateModal();
    autoResetFields && form.resetFields();
  };

  return (
    <Modal
      destroyOnClose={destroyOnClose}
      className='modal-create'
      title={<h2 style={{ textAlign: 'center' }}>{title}</h2>}
      centered
      visible={isOpenModal}
      onOk={hasForm ? hasSubmitMethod : handleSubmit}
      onCancel={toggleCreateModal}
      width={width}
      bodyStyle={bodyStyle}
    >
      <div className='scroll-menu-modal-create'>
        {hasForm ?
          <>{children}</> :
          <Form
            form={form}
            layout='vertical'
          >
            {children}
          </Form>}
      </div>
    </Modal>
  );
};
