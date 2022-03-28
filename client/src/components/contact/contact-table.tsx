import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { IContact } from '@modules/contact/entity/contact.entity';
import { useDeleteContact } from '@modules/contact/mutation/contact.delete';
import { useUpdateContact } from '@modules/contact/mutation/contact.patch';
import {
  QUERY_CONTACTS,
} from '@modules/contact/query/contact.get';
import { Button, Form, Popconfirm, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { useState } from 'react';
import { client } from '../../App';
import { ContactHeader } from './contact-header';
import { EditableCell } from '../table/editable-cell';
import { useToggle } from '@hooks/useToggle';
import { showDeleteConfirm } from '@components/modal/delete-confirm';
import { CreateModal } from '@components/modal/create-modal';
import { CreateContactForm } from './create-contact-form';
import {
  isEmail,
  isPhoneNumber,
  isRequired,
} from '@constance/rules-of-input-antd';
import { useInsertContact } from '@modules/contact/mutation/contact.post';
import { message } from 'antd';
import { dateFormat } from "@constance/date-format";
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { removeDuplicate } from '@util/array';

const { DEFAULT } = dateFormat;

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => { },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

interface ContactTableProps {
  dataSource: IContact[];
  isLoading: boolean;
  setDataContact: (value: []) => void;
}

export const ContactTable: React.FC<ContactTableProps> = ({
  dataSource,
  isLoading,
  setDataContact
}) => {

  //CRUD api
  const { mutate: updateContact } = useUpdateContact(() => {
    client.invalidateQueries(QUERY_CONTACTS);
    message.success('Save successfully !');
  });
  const { mutate: deleteContact } = useDeleteContact(() => {
    client.invalidateQueries(QUERY_CONTACTS);
    message.success('Delete successfully !');
  });
  const { mutate: insertContact } = useInsertContact(() => {
    client.invalidateQueries(QUERY_CONTACTS);
    message.success('Create new successfully !');
  });

  //filter created by follow account id
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  const accountFilter = dataSource?.filter((value) => value.account?.id !== public_user_info.id)
  const accountFormat = accountFilter?.map((value) => ({
    text: `${value.account?.firstName} ${value.account?.lastName}`,
    value: `${value.account?.firstName} ${value.account?.lastName}`
  }))
  const account = removeDuplicate(accountFormat, 'value');
  account?.unshift({
    text: 'My contacts',
    value: `${public_user_info.firstName} ${public_user_info.lastName}`
  })

  //handle method
  const [form] = Form.useForm<IContact>();
  const [isEditing, toggleEditing] = useToggle();
  const [isOpenModal, toggleCreateModal] = useToggle();

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
      updateContact({
        id,
        ...record,
      });
      form.resetFields();
    } catch (error) {
      return;
    }
  };

  const handleCreateContact = (record: any) => {

    insertContact({
      ...record,
      companyName: record.companyName,
      birth: record.birth ? record.birth.format(DEFAULT) : ''
    });
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
          title={() => <ContactHeader setDataContact={setDataContact} toggleCreateModal={toggleCreateModal} />}
          pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
          dataSource={dataSource}
          size={'small'}
          rowKey={(record) => record.id}
        >
          <Column
            title='Name'
            dataIndex='name'
            key='name'
            render={(_, record: IContact) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='name'
                nameForm='name'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                title='Name'
                record={record}
                rules={[isRequired('Name is required')]}
              />
            )}
            sorter={(a, b) => ('' + a.name).localeCompare(b.name)}
          />
          <Column
            title='Email'
            dataIndex='email'
            key='email'
            render={(_, record: IContact) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='email'
                nameForm='email'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                title='Email'
                record={record}
                rules={[isRequired('Address is required'), isEmail]}
              />
            )}
            sorter={(a, b) => ('' + a.email).localeCompare(b.email)}
          />
          <Column
            title='Phone Number'
            dataIndex='phone'
            key='phone'
            render={(_, record: IContact) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='phone'
                nameForm='phone'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                title='Phone Number'
                record={record}
                rules={[isRequired('Phone is required'), isPhoneNumber]}
              />
            )}
          />
          <Column
            title='Notes'
            dataIndex='internalNotes'
            key='internalNotes'
            render={(_, record: IContact) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='internalNotes'
                nameForm='internalNotes'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                title='Notes'
                record={record}
              />
            )}
          />
          <Column
            title='Created By'
            dataIndex='username'
            key='username'
            width={120}
            render={(_, record: IContact) => (
              <Link className="my-link" to={`view-details/${record?.id}`} >
                {record?.account?.firstName} {record?.account?.lastName}
              </Link>
            )}
            filters={account}
            defaultFilteredValue={[`${public_user_info.firstName} ${public_user_info.lastName}`]}
            filterSearch={true}
            onFilter={(value, record) => {
              let fullName = `${record.account?.firstName} ${record.account?.lastName}`
              return fullName.indexOf(value as string) === 0
            }
            }
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
                      okText='Yes'
                      cancelText='No'
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
                      onClick={() =>
                        showDeleteConfirm(() => deleteContact(record.id))
                      }
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
      <CreateModal
        title='New Contact'
        callback={handleCreateContact}
        isOpenModal={isOpenModal}
        toggleCreateModal={toggleCreateModal}
      >
        <CreateContactForm />
      </CreateModal>
    </>
  );
};
