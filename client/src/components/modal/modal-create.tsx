import { Form, Modal } from 'antd'

interface CreateModalProps {
  isOpenModal: boolean;
  toggleCreateModal: () => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpenModal,
  toggleCreateModal,
  children
}) => {
  const [form] = Form.useForm<any>();

  const handleSubmit = async () => {
    const record = await form.validateFields();
    console.log(record);
  }

  return (
    <Modal
      className="modal-create"
      title={<h2 style={{ textAlign: "center" }}>New Contact</h2>}
      centered
      visible={isOpenModal}
      onOk={handleSubmit}
      onCancel={toggleCreateModal}
      width={1000}
    >
      <div className="scroll-menu-modal-create">
        <Form form={form} layout="vertical">
          {children}
        </Form>
      </div>
    </Modal >
  )
}
