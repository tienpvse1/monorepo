import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { IContact } from '@modules/contact/entity/contact.entity';
import { useDeleteContact } from '@modules/contact/mutation/contact.delete';
import {
  QUERY_CONTACTS,
} from '@modules/contact/query/contact.get';
import { Button, Form, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { useMemo } from 'react';
import { client } from '../../App';
import { ContactHeader } from './contact-header';
import { useToggle } from '@hooks/useToggle';
import { showDeleteConfirm } from '@components/modal/delete-confirm';
import { CreateModal } from '@components/modal/create-modal';
import { CreateContactForm } from './create-contact-form';
import { useInsertContact } from '@modules/contact/mutation/contact.post';
import { message } from 'antd';
import { dateFormat } from "@constance/date-format";
import { Link, useNavigate } from 'react-router-dom';
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

  const handleFilter = () => {
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
    return account;
  }
  const arrayFilter = useMemo(() => handleFilter(), [dataSource])

  //filter company column
  const companyFilter = dataSource?.map((value) => ({
    text: value.company?.name,
    value: value.company?.name,
  }));

  //handle method
  const [form] = Form.useForm<IContact>();
  const [isOpenModal, toggleCreateModal] = useToggle();
  const navigate = useNavigate();

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
              <Link className='my-link' to={`view-details/${record.id}`}>
                {record.name}
              </Link>
            )}
            sorter={(a, b) => ('' + a.name).localeCompare(b.name)}
          />
          <Column
            title='Email'
            dataIndex='email'
            key='email'
            render={(_, record: IContact) => (
              <Link className='my-link' to={`view-details/${record.id}`}>
                {record.email}
              </Link>
            )}
            sorter={(a, b) => ('' + a.email).localeCompare(b.email)}
          />
          <Column
            title='Phone Number'
            dataIndex='phone'
            key='phone'
            render={(_, record: IContact) => (
              <Link className='my-link' to={`view-details/${record.id}`}>
                {record.phone}
              </Link>
            )}
          />
          <Column
            title='Company'
            dataIndex='companyName'
            key='companyName'
            render={(_, record: IContact) => (
              <Link className='my-link' to={`view-details/${record.id}`}>
                {record.company.name}
              </Link>
            )}
            filters={removeDuplicate(companyFilter, 'value')}
            filterSearch={true}
            onFilter={(value, record) =>
              record.company.name.indexOf(value as string) === 0
            }
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
            filters={arrayFilter}
            defaultFilteredValue={[`${public_user_info.firstName} ${public_user_info.lastName}`]}
            filterSearch={true}
            onFilter={(value, record) => {
              let fullName = `${record.account?.firstName} ${record.account?.lastName}`
              return fullName.indexOf(value as string) === 0
            }
            }
          />
          <Column
            title='Actions'
            dataIndex='actions'
            key='actions'
            render={(_, record: IContact) => (
              <Space size='small' style={{ width: '100%' }}>
                <>
                  <Button
                    type='ghost'
                    shape='round'
                    onClick={() => navigate(`view-details/${record.id}`)}
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
