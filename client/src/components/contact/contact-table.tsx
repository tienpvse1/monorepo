import { CrownOutlined, DeleteOutlined, ExclamationCircleOutlined, FormOutlined, ScheduleOutlined, SketchOutlined } from '@ant-design/icons';
import { CreateModal } from '@components/modal/create-modal';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { dateFormat } from '@constance/date-format';
import { useHandleNavigate } from '@hooks/useHandleNavigate';
import { useToggle } from '@hooks/useToggle';
import { Role } from '@interfaces/type-roles';
import { IContact } from '@modules/contact/entity/contact.entity';
import { useDeleteContact } from '@modules/contact/mutation/contact.delete';
import { useInsertContact } from '@modules/contact/mutation/contact.post';
import { QUERY_CONTACTS } from '@modules/contact/query/contact.get';
import { removeDuplicate } from '@util/array';
import { Button, Empty, List, message, Modal, Space, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../../App';
import { ContactHeader } from './contact-header';
import { CreateContactForm } from './create-contact-form';
import numberSeparator from "number-separator";

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
  queryKey: string;
  searchMethod: (text: string, id?: string) => Promise<any>;
}

export const ContactTable: React.FC<ContactTableProps> = ({
  dataSource,
  isLoading,
  setDataContact,
  queryKey,
  searchMethod
}) => {
  const [deleteItem, setDeleteItem] = useState<IContact>(null);

  console.log('deleteItem:', deleteItem);


  //CRUD api
  const { mutate: deleteContact } = useDeleteContact(() => {
    client.invalidateQueries([QUERY_CONTACTS, queryKey]);
    message.success('Delete successfully !');
  });
  const { mutate: insertContact } = useInsertContact(() => {
    client.invalidateQueries([QUERY_CONTACTS, queryKey]);
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

  const isRoleSaleManager = () => {
    return public_user_info.role.name === Role.SALE_MANAGER;
  }

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
        scroll={{ x: 1300 }}
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
            searchMethod={searchMethod}
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
          width={200}
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
          width={150}
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
        {isRoleSaleManager() &&
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
            filterSearch={true}
            onFilter={(value, record) => {
              let fullName = `${record.account?.firstName} ${record.account?.lastName}`;
              return fullName.indexOf(value as string) === 0;
            }}
          />
        }

        <Column
          title="Created Date"
          dataIndex="createdAt"
          key="createdAt"
          width={120}
          render={(_, record: any) => (
            <Link className='my-link' to={`view-details/${record.id}`}>
              {moment(record.createdAt).format(DEFAULT)}
            </Link>
          )}
          sorter={(a, b) => moment(a.createdAt).diff(moment(b.createdAt))}
        />

        <Column
          title='Action'
          dataIndex='action'
          key='action'
          width={125}
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
        title={
          <span style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
            <ExclamationCircleOutlined
              style={{
                fontSize: '20px',
                marginRight: '10px',
                color: '#F9A825'
              }}
            />
            Are you sure want to delete ?
          </span>
        }
        onOk={() =>
          deleteContact(deleteItem.id, {
            onSuccess: () => {
              client.refetchQueries(QUERY_CONTACTS);
              setDeleteItem(null);
            },
          })
        }
      >
        <>
          {deleteItem && deleteItem.pipelineItems.length > 0 ? (
            <List
              header={
                <div style={{ fontSize: '17px', marginTop: '-15px' }}>
                  Contact Dependencies:
                </div>}
              bordered={false}
            >
              {deleteItem && deleteItem.pipelineItems.length > 0 &&
                <>
                  <List.Item>
                    <Tag
                      icon={<CrownOutlined />}
                      style={{ fontSize: '16px' }}
                      color={'#FBC02D'}
                    >
                      Opportunity:
                    </Tag> {deleteItem?.pipelineItems.length}
                  </List.Item>
                  <List.Item>
                    <Tag
                      icon={<SketchOutlined />}
                      style={{ fontSize: '16px' }}
                      color={'#f50'}
                    >
                      Expected revenue:
                    </Tag>
                    {numberSeparator(deleteItem?.pipelineItems.reduce((acc, value) =>
                      acc + value.expectedRevenue, 0), '.')}đ
                  </List.Item>
                  <List.Item >
                    <Tag
                      icon={<ScheduleOutlined />}
                      color={'#7E57C2'}
                      style={{ fontSize: '16px' }}
                    >
                      Scheduled activity:
                    </Tag> {deleteItem.pipelineItems.reduce((acc, value) =>
                      acc + value.schedules.length, 0)}
                  </List.Item>
                </>
              }
            </List>
          ) : (
            <Empty description='No Dependent' />
          )}
        </>
      </Modal>
    </>
  );
};
