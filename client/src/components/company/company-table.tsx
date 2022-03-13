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

export const CompanyTable = () => {
  const data = [{
    id: '1vxza',
    name: 'Company name',
    email: 'company@gmail.com',
    phone: '0902750631',
    companyOwner: 'ChuongNguyen',
    city: 'TPHCM',
    country: 'Viet Nam'
  }]
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
      phone: record.phone,
      city: record.city,
      country: record.country
    })
  };
  const handleCreateCompany = () => {

  }

  return (
    <>
      <Form form={form}>
        <Table
          // loading={isLoading}
          dataSource={data}
          tableLayout='fixed'
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          title={() => <CompanyTitleTable toggleCreateModal={toggleCreateModal} />}
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
                linkTo={`view-details/`}
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
            title="Email"
            dataIndex="email"
            key="email"
            render={(_, record: any) => (
              <EditableCell
                linkTo={`view-details/`}
                dataIndex='email'
                nameForm='email'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
              />
            )}
          />
          <Column
            title="Phone"
            dataIndex="phone"
            key="phone"
            render={(_, record: any) => (
              <EditableCell
                linkTo={`view-details/`}
                dataIndex='phone'
                nameForm='phone'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
              />
            )}

          />
          <Column
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

          />
          <Column
            title="City"
            dataIndex="city"
            key="city"
            render={(_, record: any) => (
              <EditableCell
                linkTo={`view-details/`}
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
                linkTo={`view-details/`}
                dataIndex='country'
                nameForm='country'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
              />
            )}

          />

          <Column title="Actions" dataIndex="actions" key="actions" width={150}
            render={(_, record: any) => (
              <Space size='small' style={{ width: '100%' }}>
                {isEditing && record.id === editingIndex ? (
                  <>
                    <Button type='link' onClick={() => { }}>
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
                      onClick={() => showDeleteConfirm(() => { })}
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
