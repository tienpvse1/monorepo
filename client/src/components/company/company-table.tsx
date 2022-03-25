import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { EditableCell } from "@components/table/editable-cell";
import { Button, Form, Popconfirm, Space, Table } from "antd"
import Column from "antd/lib/table/Column"
import { useState } from "react";
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
import { useUpdateCompany } from "@modules/company/mutation/company.patch";
import { useQueryClient } from "react-query";
import { useDeleteCompany } from "@modules/company/mutation/company.delete";
import { ICompany } from "@modules/company/entity/company.entity";
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

  const { mutate: createCompany } = useCreateCompany();
  const { mutate: updateCompany } = useUpdateCompany();
  const { mutate: deleteCompany } = useDeleteCompany();

  const [form] = Form.useForm<any>();
  const [isEditing, toggleEditing] = useToggle();
  const [isOpenModal, toggleCreateModal] = useToggle();
  const [editingIndex, setEditingIndex] = useState('');


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => { },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const handleEditClick = (record: any) => {
    toggleEditing();
    setEditingIndex(record.id);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      mobile: record.mobile,
      city: record.city,
      country: record.country
    })
  };
  const handleCreateCompany = (record: any) => {
    const { residence, region, address, city, country, ...rest } = record;
    createCompany({
      ...rest,
      state: region === 'VN' ? residence[1] : address,
      city: region === 'VN' ? residence[0] : city,
      country: region === 'VN' ? region : country,
      type: 'company',
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_COMPANIES);
        message.success('Create new company successfully');
      }
    })
  }

  const handleSave = async (id: string) => {
    try {
      const record = await form.validateFields();
      updateCompany({
        id,
        ...record
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(QUERY_COMPANIES);
          message.success('Saved successfully');
          toggleEditing();
        }
      })
    } catch (error) {
      return;
    }
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
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='name'
                nameForm='name'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
              />
            )}
          />

          <Column
            title="Phone"
            dataIndex="mobile"
            key="mobile"
            render={(_, record: any) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='mobile'
                nameForm='mobile'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
              />
            )}

          />

          {/* <Column
            title="Company Owner"
            dataIndex="companyOwner"
            key="companyOwner"
            render={(_, record: any) => (
              <EditableCell
                linkTo={`view-details/`}
                dataIndex='companyOwner'
                nameForm='companyOwner'
                editing={false}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
              />
            )}
          /> */}

          <Column
            title="City"
            dataIndex="city"
            key="city"
            render={(_, record: any) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='city'
                nameForm='city'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
              />
            )}

          />
          <Column
            title="Country"
            dataIndex="country"
            key="country"
            render={(_, record: any) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='country'
                nameForm='country'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
              />
            )}

          />

          <Column
            title="Created at"
            dataIndex="createdAt"
            key="createdAt"
            render={(_, record: any) => (
              <span>{moment(record.createdAt).format(CRUD_AT)}</span>
            )}
          />

          <Column title="Actions" dataIndex="actions" key="actions" width={150}
            render={(_, record: any) => (
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
                )}
              </Space>
            )}
          />
        </Table>
      </Form>
      <CreateModal
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
