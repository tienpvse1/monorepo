import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Modal, Space, Table } from "antd"
import Column from "antd/lib/table/Column"
import { useToggle } from "@hooks/useToggle";
import { showDeleteConfirm } from '@components/modal/delete-confirm';
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
const { CRUD_AT } = dateFormat;

interface CompanyTableProps {
  dataSource: ICompany[];
  isLoading: boolean;
  setDataCompany: (value: []) => void;
}

export const CompanyTable: React.FC<CompanyTableProps> = ({
  dataSource,
  isLoading,
  setDataCompany
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createCompany } = useCreateCompany();
  const { mutate: deleteCompany } = useDeleteCompany();

  const [form] = Form.useForm<any>();
  const [isOpenModal, toggleCreateModal] = useToggle();


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => { },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const handleCreateCompany = (record: any, form: FormInstance<any>) => {
    const { region, country, ...rest } = record;
    createCompany({
      ...rest,
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
          if (error.response.data.message.includes('Duplicate entry')) {
            Modal.error({
              title: `Company name already exists !!`,
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
      <Form form={form}>
        <Table
          loading={isLoading}
          dataSource={dataSource}
          tableLayout='fixed'
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          title={() => <CompanyTitleTable setDataCompany={setDataCompany} toggleCreateModal={toggleCreateModal} />}
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

          <Column
            title="Created Date"
            dataIndex="createdAt"
            key="createdAt"
            render={(_, record: any) => (
              <Link className='my-link' to={`view-details/${record.id}`}>
                {moment(record.createdAt).format(CRUD_AT)}
              </Link>
            )}
            sorter={(a, b) => moment(a.createdAt).diff(moment(b.createdAt))}
          />

          <Column title="Actions" dataIndex="actions" key="actions" width={150}
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
                  </Button>
                </>
              </Space>
            )}
          />
        </Table>
      </Form>
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
    </>
  )
}
