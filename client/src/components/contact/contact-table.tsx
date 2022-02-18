import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Loading } from '@components/loading/loading';
import { Contact } from '@modules/contact/entity/contact.entity';
import { useDeleteContact } from '@modules/contact/mutation/contact.delete';
import { useUpdateContact } from '@modules/contact/mutation/contact.patch';
import {
  QUERY_CONTACTS,
  useContacts,
} from '@modules/contact/query/contact.get';
import { Button, Form, Popconfirm, Space, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { FC, useState } from 'react';
import { client } from '../../App';
import { ContactHeader } from './contact-header';
import { EditableCell } from './editable-cell';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {},
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

export const ContactData: FC = () => {
  const { data, isLoading } = useContacts();
  const { mutate } = useUpdateContact(() =>
    client.invalidateQueries(QUERY_CONTACTS)
  );
  const { mutate: deleteContact } = useDeleteContact(() =>
    client.invalidateQueries(QUERY_CONTACTS)
  );
  const title = () => <ContactHeader />;
  const [form] = Form.useForm<Contact>();
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState('');

  const toggleEditing = () => setIsEditing(!isEditing);

  if (isLoading) return <Loading />;
  const handleEditClick = (record: Contact) => {
    toggleEditing();
    setEditingIndex(record.id);
    const { name, address, phone, email } = record;
    form.setFieldsValue({
      phone,
      name,
      email,
      address,
    });
  };

  const handleSave = async (id: string) => {
    try {
      const record = await form.validateFields();
      toggleEditing();
      mutate({
        id,
        ...record,
      });
    } catch (error) {
      return;
    }
  };
  return (
    <>
      <Form form={form}>
        {data && (
          <Table
            tableLayout='fixed'
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            title={title}
            pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
            dataSource={data}
            size={'large'}
          >
            <Column
              title='Name'
              dataIndex='name'
              key='name'
              render={(_, record: Contact) => (
                <EditableCell
                  dataIndex='name'
                  editing={isEditing}
                  editingIndex={editingIndex}
                  recordIndex={record.id}
                  title='Name'
                  record={record}
                  rules={[
                    {
                      required: true,
                      message: 'Name is required',
                    },
                  ]}
                />
              )}
            />
            <Column
              title='Address'
              dataIndex='address'
              key='address'
              render={(_, record: Contact) => (
                <EditableCell
                  dataIndex='address'
                  editing={isEditing}
                  editingIndex={editingIndex}
                  recordIndex={record.id}
                  title='Address'
                  record={record}
                  rules={[
                    {
                      required: true,
                      message: 'Address is required',
                    },
                  ]}
                />
              )}
            />
            <Column
              title='Phone Number'
              dataIndex='phone'
              key='phone'
              render={(_, record: Contact) => (
                <EditableCell
                  dataIndex='phone'
                  editing={isEditing}
                  editingIndex={editingIndex}
                  recordIndex={record.id}
                  title='Name'
                  record={record}
                  rules={[
                    {
                      required: true,
                      message: 'name is required',
                    },
                    {
                      pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                      message: 'must be phone number',
                    },
                  ]}
                />
              )}
            />
            <Column
              title='Email'
              dataIndex='email'
              key='email'
              render={(_, record: Contact) => (
                <EditableCell
                  dataIndex='email'
                  editing={isEditing}
                  editingIndex={editingIndex}
                  recordIndex={record.id}
                  title='Name'
                  record={record}
                  rules={[
                    {
                      required: true,
                      message: 'Address is required',
                    },
                    {
                      type: 'email',
                      message: 'must be email',
                    },
                  ]}
                />
              )}
            />
            <Column
              title='Type'
              dataIndex='type'
              key='type'
              render={(text) => (
                <span>
                  <Tag color={'volcano'} key={text.type}>
                    {text.toUpperCase()}
                  </Tag>
                </span>
              )}
            />
            <Column
              title='Action'
              dataIndex='action'
              key='action'
              render={(_, record: Contact) => (
                <Space size='small' style={{ width: '100%' }}>
                  {isEditing && record.id === editingIndex ? (
                    <>
                      <Button type='link' onClick={() => handleSave(record.id)}>
                        Save
                      </Button>
                      <Popconfirm
                        title='Are you sure cancel this task?'
                        onConfirm={toggleEditing}
                      >
                        <span style={{ cursor: 'pointer' }}>Cancel</span>
                      </Popconfirm>
                    </>
                  ) : (
                    <>
                      <Button
                        type='ghost'
                        shape='round'
                        onClick={() => handleEditClick(record)}
                      >
                        <FormOutlined />
                      </Button>

                      <Button
                        type='default'
                        onClick={() => deleteContact(record.id)}
                        shape='round'
                        danger
                      >
                        <DeleteOutlined />
                      </Button>
                    </>
                  )}
                </Space>
              )}
            />
          </Table>
        )}
      </Form>
    </>
  );
};
