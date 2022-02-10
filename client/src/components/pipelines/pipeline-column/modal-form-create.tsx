import { FC } from 'react';
import { Modal, Form, Input } from 'antd';


interface ModalFormCreateColumn {
  visible: boolean;
  onCreate: (values) => void;
  onCancel: () => void;
}

export const ModalFormCreateColumn: FC<ModalFormCreateColumn> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        visible={visible}
        title="Add a column"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="name"
            label="Column name"
            rules={[{ required: true, message: 'Please input the name of column!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
