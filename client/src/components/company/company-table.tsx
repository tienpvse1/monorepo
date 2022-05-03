import { ContactsOutlined, DeleteOutlined, ExclamationCircleOutlined, FormOutlined, SketchOutlined } from "@ant-design/icons";
import { Button, Empty, FormInstance, List, Modal, Space, Table, Tag } from "antd"
import Column from "antd/lib/table/Column"
import { useToggle } from "@hooks/useToggle";
import { CompanyTitleTable } from "@components/company/company-title-table";
import { CreateModal } from "@components/modal/create-modal";
import { CreateCompanyForm } from "./create-company-form";
import { QUERY_COMPANIES } from "@modules/company/query/company.get";
import moment from "moment";
import { dateFormat } from "@constance/date-format";
import { useCreateCompany } from "@modules/company/mutation/company.post";
import { message } from 'antd';
import { useQueryClient } from "react-query";
import { useDeleteCompany } from "@modules/company/mutation/company.delete";
import { ICompany } from "@modules/company/entity/company.entity";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
const { DEFAULT } = dateFormat;
import numberSeparator from "number-separator";
import { useCookies } from "react-cookie";
import { PUBLIC_USER_INFO } from "@constance/cookie";
import { removeDuplicate } from "@util/array";
import { Role } from "@interfaces/type-roles";

interface CompanyTableProps {
  dataSource: ICompany[];
  isLoading: boolean;
  setDataCompany: (value: []) => void;
  searchMethod: (text: string, id?: string) => Promise<any>;
}

export const CompanyTable: React.FC<CompanyTableProps> = ({
  dataSource,
  isLoading,
  setDataCompany,
  searchMethod
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createCompany } = useCreateCompany();
  const { mutate: deleteCompany } = useDeleteCompany();
  const [deleteItem, setDeleteItem] = useState<ICompany>(null);
  const [isOpenModal, toggleCreateModal] = useToggle();

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => { },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  //Filter created by follow account id
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  const handleFilter = () => {
    const accountFilter = dataSource?.filter(
      (value) => value.creator?.id !== public_user_info.id
    );
    const accountFormat = accountFilter?.map((value) => ({
      text: `${value.creator?.firstName} ${value.creator?.lastName}`,
      value: `${value.creator?.firstName} ${value.creator?.lastName}`,
    }));
    const account = removeDuplicate(accountFormat, 'value');
    account?.unshift({
      text: 'My company',
      value: `${public_user_info.firstName} ${public_user_info.lastName}`,
    });
    return account;
  };
  const arrayFilter = useMemo(() => handleFilter(), [dataSource]);

  const isRoleSaleManager = () => {
    return public_user_info.role.name === Role.SALE_MANAGER;
  }

  const handleCreateCompany = (record: any, form: FormInstance<any>) => {
    const { region, country, foundationDate, ...rest } = record;
    createCompany({
      ...rest,
      foundationDate: foundationDate ? foundationDate.format(DEFAULT) : undefined,
      country: region === 'VN' ? region : country,
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_COMPANIES);
        message.success('Create new company successfully');
        toggleCreateModal();
        form.resetFields();
      },
      onError: (error: any) => {
        if (error.response) {
          if (error.response.data.message.includes(`Duplicate entry '${rest.name}'`)) {
            Modal.error({
              title: `Company Name already exists !!`,
              content: 'please try again later...',
            });
          } else if (error.response.data.message.includes(`Duplicate entry '${rest.email}'`)) {
            Modal.error({
              title: `Company Email already exists !!`,
              content: 'please try again later...',
            });
          } else {
            message.error(`${error}`);
          }
        }
      }
    })
  }

  return (
    <>
      <Table
        loading={isLoading}
        dataSource={dataSource}
        tableLayout='fixed'
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        title={() =>
          <CompanyTitleTable
            setDataCompany={setDataCompany}
            toggleCreateModal={toggleCreateModal}
            searchMethod={searchMethod}
          />}
        pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
        size={'small'}
        rowKey={(record) => record.id}
      >
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          render={(_, record: any) => (
            <Link className='my-link' to={`view-details/${record.id}`}>
              {record.name}
            </Link>
          )}
          sorter={(a, b) => ('' + a.name).localeCompare(b.name)}
        />

        <Column
          title="Phone"
          dataIndex="mobile"
          key="mobile"
          render={(_, record: any) => (
            <Link className='my-link' to={`view-details/${record.id}`}>
              {record.mobile}
            </Link>
          )}

        />

        <Column
          title="City"
          dataIndex="city"
          key="city"
          render={(_, record: any) => (
            <Link className='my-link' to={`view-details/${record.id}`}>
              {record.city?.admin_name}
            </Link>
          )}
          sorter={(a, b) => ('' + a.city?.name).localeCompare(b.city?.name)}
        />
        <Column
          title="Country"
          dataIndex="country"
          key="country"
          render={(_, record: any) => (
            <Link className='my-link' to={`view-details/${record.id}`}>
              {record.country}
            </Link>
          )}
          sorter={(a, b) => ('' + a.country).localeCompare(b.country)}
        />
        
        {isRoleSaleManager() &&
          <Column
            title='Created By'
            dataIndex='username'
            key='username'
            width={120}
            render={(_, record: ICompany) => (
              <Link className='my-link' to={`view-details/${record?.id}`}>
                {record?.creator?.firstName} {record?.creator?.lastName}
              </Link>
            )}
            filters={arrayFilter}
            filterSearch={true}
            onFilter={(value, record) => {
              let fullName = `${record.creator?.firstName} ${record.creator?.lastName}`;
              return fullName.indexOf(value as string) === 0;
            }}
          />
        }

        <Column
          title="Created Date"
          dataIndex="createdAt"
          key="createdAt"
          render={(_, record: any) => (
            <Link className='my-link' to={`view-details/${record.id}`}>
              {moment(record.createdAt).format(DEFAULT)}
            </Link>
          )}
          sorter={(a, b) => moment(a.createdAt).diff(moment(b.createdAt))}
        />

        <Column title="Action" dataIndex="action" key="action" width={150}
          render={(_, record: any) => (
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
                {/* <Button
                  type='default'
                  onClick={() => showDeleteConfirm(() => deleteCompany(record.id, {
                    onSuccess: () => {
                      queryClient.invalidateQueries(QUERY_COMPANIES);
                      message.success('Deleted company successfully!');
                    }
                  }))}
                  shape='round'
                  danger
                >
                  <DeleteOutlined />
                </Button> */}
              </>
            </Space>
          )}
        />
      </Table>
      <CreateModal
        autoToggleModel={false}
        autoResetFields={false}
        title='New Company'
        callback={handleCreateCompany}
        isOpenModal={isOpenModal}
        toggleCreateModal={toggleCreateModal}
      >
        <CreateCompanyForm />
      </CreateModal>
      <Modal
        onCancel={() => setDeleteItem(null)}
        visible={deleteItem != null}
        bodyStyle={{ height: '180px' }}
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
          deleteCompany(deleteItem.id, {
            onSuccess: () => {
              queryClient.invalidateQueries(QUERY_COMPANIES);
              message.success('Deleted company successfully!');
              setDeleteItem(null);
            }
          })
        }
      >
        <>
          {deleteItem && deleteItem.contacts.length > 0 ? (
            <List
              header={
                <div style={{ fontSize: '17px', marginTop: '-15px' }}>
                  Company Dependencies:
                </div>}
              bordered={false}
            >
              {deleteItem && deleteItem.contacts.length > 0 &&
                <>
                  <List.Item>
                    <Tag
                      icon={<ContactsOutlined />}
                      style={{ fontSize: '16px' }}
                      color={'#C2185B'}
                    >
                      Contact:
                    </Tag> {deleteItem?.contacts.length}
                  </List.Item>
                  <List.Item>
                    <Tag
                      icon={<SketchOutlined />}
                      style={{ fontSize: '16px' }}
                      color={'#f50'}
                    >
                      Expected revenue:
                    </Tag>
                    {numberSeparator(deleteItem?.contacts.reduce((acc, value) =>
                      acc + value.pipelineItems.reduce((acc2, item) => acc2 + item.expectedRevenue, 0), 0), '.')}đ
                  </List.Item>
                  {/* <List.Item >
                    <Tag
                      icon={<ScheduleOutlined />}
                      color={'#7E57C2'}
                      style={{ fontSize: '16px' }}
                    >
                      Scheduled activity:
                    </Tag> {deleteItem.pipelineItems.reduce((acc, value) =>
                      acc + value.schedules.length, 0)}
                  </List.Item> */}
                </>
              }
            </List>
          ) : (
            <Empty description='No Dependent' />
          )}
        </>
      </Modal>
    </>
  )
}
