import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { CreateModal } from '@components/modal/create-modal';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { dateFormat } from '@constance/date-format';
import { useHandleNavigate } from '@hooks/useHandleNavigate';
import { useToggle } from '@hooks/useToggle';
import { IContact } from '@modules/contact/entity/contact.entity';
import { useDeleteContact } from '@modules/contact/mutation/contact.delete';
import { useInsertContact } from '@modules/contact/mutation/contact.post';
import { QUERY_CONTACTS } from '@modules/contact/query/contact.get';
import { removeDuplicate } from '@util/array';
import { Button, Empty, message, Modal, Space, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../../App';
import { ContactHeader } from './contact-header';
import { CreateContactForm } from './create-contact-form';

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
  setDataContact,
}) => {
  const [deleteItem, setDeleteItem] = useState<IContact>(null);
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
    const accountFilter = dataSource?.filter(
      (value) => value.account?.id !== public_user_info.id
    );
    const accountFormat = accountFilter?.map((value) => ({
      text: `${value.account?.firstName} ${value.account?.lastName}`,
      value: `${value.account?.firstName} ${value.account?.lastName}`,
    }));
    const account = removeDuplicate(accountFormat, 'value');
    account?.unshift({
      text: 'My contacts',
      value: `${public_user_info.firstName} ${public_user_info.lastName}`,
    });
    return account;
  };
  const arrayFilter = useMemo(() => handleFilter(), [dataSource]);

  //filter company column
  const companyFilter = dataSource?.map((value) => ({
    text: value.company?.name,
    value: value.company?.name,
  }));

  //filter tags
  const arrayTags: any = dataSource?.map((contact) => {
    return contact.tags?.map((tag) => tag.name);
  });
  const arrayConcatTags = [].concat.apply([], arrayTags);
  const tagsFilter = arrayConcatTags.map((value) => ({
    text: value,
    value: value,
  }));

  //handle method
  const [isOpenModal, toggleCreateModal] = useToggle();
  const navigate = useNavigate();
  const { navigateRole } = useHandleNavigate();

  const handleCreateContact = (record: any) => {
    insertContact({
      ...record,
      companyName: record.companyName,
      birth: record.birth ? record.birth.format(DEFAULT) : '',
    });
  };

  return (
    <>
      <Table
        loading={isLoading}
        tableLayout='fixed'
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        title={() => (
          <ContactHeader
            setDataContact={setDataContact}
            toggleCreateModal={toggleCreateModal}
          />
        )}
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
            <Link
              className='my-link'
              to={`${navigateRole}company/view-details/${record.company?.id}`}
            >
              {record.company?.name}
            </Link>
          )}
          filters={removeDuplicate(companyFilter, 'value')}
          filterSearch={true}
          onFilter={(value, record) =>
            record.company.name.indexOf(value as string) === 0
          }
        />
        <Column
          title='Job Position'
          dataIndex='jobPosition'
          key='jobPosition'
          render={(_, record: IContact) => (
            <Link className='my-link' to={`view-details/${record?.id}`}>
              {record.jobPosition}
            </Link>
          )}
          sorter={(a, b) => ('' + a.jobPosition).localeCompare(b.jobPosition)}
        />

        <Column
          title='Tags'
          dataIndex='tags'
          key='tags'
          render={(_, record: IContact) =>
            record.tags?.map((tag) => (
              <Tag style={{ marginTop: '3px' }} color={tag.color} key={tag.id}>
                {tag.name}
              </Tag>
            ))
          }
          filters={removeDuplicate(tagsFilter, 'value')}
          filterSearch={true}
          onFilter={(value, record) =>
            record.tags.some((tag) => tag.name === value)
          }
        />

        <Column
          title='Created By'
          dataIndex='username'
          key='username'
          width={120}
          render={(_, record: IContact) => (
            <Link className='my-link' to={`view-details/${record?.id}`}>
              {record?.account?.firstName} {record?.account?.lastName}
            </Link>
          )}
          filters={arrayFilter}
          defaultFilteredValue={[
            `${public_user_info.firstName} ${public_user_info.lastName}`,
          ]}
          filterSearch={true}
          onFilter={(value, record) => {
            let fullName = `${record.account?.firstName} ${record.account?.lastName}`;
            return fullName.indexOf(value as string) === 0;
          }}
        />

        <Column
          title='Action'
          dataIndex='action'
          key='action'
          fixed={'right'}
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
                  onClick={() => setDeleteItem(record)}
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
      <CreateModal
        title='New Contact'
        callback={handleCreateContact}
        isOpenModal={isOpenModal}
        toggleCreateModal={toggleCreateModal}
      >
        <CreateContactForm />
      </CreateModal>
      <Modal
        onCancel={() => setDeleteItem(null)}
        visible={deleteItem != null}
        title='Are you sure want to delete'
        onOk={() =>
          deleteContact(deleteItem.id, {
            onSettled: () => {
              client.refetchQueries(QUERY_CONTACTS);
              setDeleteItem(null);
            },
          })
        }
      >
        <div>
          {deleteItem && deleteItem.pipelineItems.length > 0 ? (
            <ul>
              {deleteItem && deleteItem.pipelineItems.length > 0 && (
                <li>
                  <span style={{ textDecoration: 'underline' }}>
                    {deleteItem?.pipelineItems.length}
                  </span>{' '}
                  opportunity
                </li>
              )}
              {deleteItem && deleteItem.pipelineItems.length > 0 && (
                <li>
                  expected revenue:{' '}
                  <span style={{ textDecoration: 'underline' }}>
                    {deleteItem.pipelineItems.length > 0 &&
                      deleteItem?.pipelineItems.reduce(
                        (a, b) => a.expectedClosing + b.expectedRevenue
                      )}
                  </span>
                </li>
              )}
              {deleteItem && deleteItem.pipelineItems.length > 0 && (
                <li>
                  <span style={{ textDecoration: 'underline' }}>
                    {deleteItem.pipelineItems.reduce(
                      // @ts-ignore
                      (a, b) => a.schedules.length + b.schedules.length
                    )}
                  </span>{' '}
                  scheduled activity
                </li>
              )}
            </ul>
          ) : (
            <Empty description='no dependent' />
          )}
        </div>
      </Modal>
    </>
  );
};
