import { FileTextOutlined } from '@ant-design/icons';
import { EditButtonHover } from '@components/page-details/edit-button-hover';
import { useToggle } from '@hooks/useToggle';
import { IContact } from '@modules/contact/entity/contact.entity';
import { useUpdateContact } from '@modules/contact/mutation/contact.patch';
import { QUERY_CONTACTS_BY_ID } from '@modules/contact/query/contact.get';
import { Alert, Button, Form, Input, message, Space } from 'antd';
import React from 'react'
import { useQueryClient } from 'react-query';

interface ContactNotesProps {
  data: IContact;
}

export const ContactNotes: React.FC<ContactNotesProps> = ({ data }) => {
  const [isEditingForm, toggleEditForm] = useToggle();
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries(QUERY_CONTACTS_BY_ID);
    message.success('Saved successfully !');
    toggleEditForm();
  };

  const { mutate: UpdateContact } = useUpdateContact(onSuccess);

  const [form] = Form.useForm<IContact>();
  const handleToggleEdit = () => {
    toggleEditForm();
    form.setFieldsValue({
      internalNotes: data.internalNotes
    })
  }

  const handleToggleSubmit = async () => {
    const value = await form.validateFields();
    UpdateContact({
      id: data.id,
      ...value
    })
  }

  return (
    <Form form={form}>
      {isEditingForm ? (
        <>
          <Alert
            message="Internal Notes"
            showIcon
            icon={<FileTextOutlined />}
            description={
              <Form.Item
                style={{ borderBottom: '1px solid black' }}
                name="internalNotes"
              >
                <Input.TextArea showCount maxLength={150} autoFocus bordered={false} />
              </Form.Item>
            }
            type="warning"
          />
          <Space style={{ paddingTop: '15px', float: 'right' }}>
            <Button onClick={() => handleToggleSubmit()} type='primary'>
              Save
            </Button>
            <Button onClick={toggleEditForm}>Cancel</Button>
          </Space>
        </>
      ) :
        <EditButtonHover toggleEditForm={handleToggleEdit}>
          <Alert
            message="Internal Notes"
            showIcon
            icon={<FileTextOutlined />}
            description={`${data.internalNotes || 'No notes have been recorded yet'}`}
            type="warning"
          />
        </EditButtonHover>
      }
    </Form>
  )
}
