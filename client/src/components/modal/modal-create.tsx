import { Form, Modal } from 'antd'

interface ModalCreateProps {
  isOpenModal: boolean;
  toggleModalCreate: () => void;
}

export const ModalCreate: React.FC<ModalCreateProps> = ({
  isOpenModal,
  toggleModalCreate,
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
      onCancel={toggleModalCreate}
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
