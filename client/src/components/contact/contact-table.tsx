import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { IContact } from '@modules/contact/entity/contact.entity';
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
import { EditableCell } from '../table/editable-cell';
import { useToggle } from '@hooks/useToggle';
import { showDeleteConfirm } from '@components/modal/delete-confirm';
import { ModalCreate } from '@components/modal/modal-create';
import { FormCreateContact } from './form-create-contact';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => { },
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
  const [form] = Form.useForm<IContact>();
  const [isEditing, toggleEditing] = useToggle();
  const [isOpenModal, toggleModalCreate] = useToggle();

  const [editingIndex, setEditingIndex] = useState('');

  const handleEditClick = (record: IContact) => {
    toggleEditing();
    setEditingIndex(record.id);
    const { name, internalNotes, phone, email } = record;
    form.setFieldsValue({
      phone,
      name,
      email,
      internalNotes,
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
        <Table
          loading={isLoading}
          tableLayout='fixed'
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          title={() =>
            <ContactHeader toggleModalCreate={toggleModalCreate} />
          }
          pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
          dataSource={data?.map((value) => ({ ...value, key: value.name }))}
          size={'large'}
        >
          <Column
            title='Name'
            dataIndex='name'
            key='name'
            render={(_, record: IContact) => (
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
            title='Email'
            dataIndex='email'
            key='email'
            render={(_, record: IContact) => (
              <EditableCell
                dataIndex='email'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                title='Email'
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
            title='Phone Number'
            dataIndex='phone'
            key='phone'
            render={(_, record: IContact) => (
              <EditableCell
                dataIndex='phone'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                title='Phone Number'
                record={record}
                rules={[
                  {
                    required: true,
                    message: 'phone is required',
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
            title='Notes'
            dataIndex='internalNotes'
            key='internalNotes'
            render={(_, record: IContact) => (
              <EditableCell
                dataIndex='internalNotes'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                title='Notes'
                record={record}
                rules={[
                  {
                    required: true,
                    message: 'Notes is required',
                  },
                ]}
              />
            )}
          />
          <Column
            title='Type'
            dataIndex='type'
            key='type'
            width={120}
            render={(text) => (
              <span>
                <Tag color={'gold'} key={text.type}>
                  {text ? text.toUpperCase() : 'NULL'}
                </Tag>
              </span>
            )}
          />
          <Column
            title='Action'
            dataIndex='action'
            key='action'
            render={(_, record: IContact) => (
              <Space size='small' style={{ width: '100%' }}>
                {isEditing && record.id === editingIndex ? (
                  <>
                    <Button type='link' onClick={() => handleSave(record.id)}>
                      Save
                    </Button>
                    <Popconfirm
                      title='Sure to cancel?'
                      onConfirm={toggleEditing}
                      okText="Yes"
                      cancelText="No"
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
                      onClick={() => showDeleteConfirm(() => deleteContact(record.id))}
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
      </Form>
      <ModalCreate
        isOpenModal={isOpenModal}
        toggleModalCreate={toggleModalCreate}
      >
        <FormCreateContact />
      </ModalCreate>
    </>
  );
};
