import { Modal, Form, Input, Checkbox } from 'antd';

interface ModalFormCreateStageColumnProps {
  visible: boolean;
  onCreate: (values) => void;
  onCancel: () => void;
}

export const ModalFormCreateStageColumn: React.FC<
  ModalFormCreateStageColumnProps
> = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        visible={visible}
        title='Create a stage'
        bodyStyle={{height: '180px'}}
        okText='Create'
        cancelText='Cancel'
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout='vertical'
          name='form_in_modal'
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name='name'
            label='Stage name'
            rules={[
              { required: true, message: 'Please input the name of column!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='isWon'
            initialValue={false}
          >
            <Checkbox>Stage is won</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
