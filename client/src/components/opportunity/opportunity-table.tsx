import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { EditableCell } from "@components/table/editable-cell";
import { Button, Form, Popconfirm, Space, Table } from "antd"
import Column from "antd/lib/table/Column"
import { useState } from "react";
import { useToggle } from "@hooks/useToggle";
import { showDeleteConfirm } from '@components/modal/delete-confirm';
import { OpportunityTitleTable } from "@components/opportunity/opportunity-title-table";
import { useQueryPipelineByAccountId } from "@modules/pipeline-items/query/pipeline-item.get";
import { useCookies } from "react-cookie";
import { PUBLIC_USER_INFO } from "@constance/cookie";
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { isRequired } from "@constance/rules-of-input-antd";
import { CreateModal } from '@components/modal/create-modal';
import { CreateOpportunityForm } from "./create-opportunity-form";


export const OpportunitiesTable = () => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);

  const { data, isLoading } = useQueryPipelineByAccountId(id);
  const [isOpenModal, toggleCreateModal] = useToggle();
  const [isEditing, toggleEditing] = useToggle();
  const [editingIndex, setEditingIndex] = useState('');
  const [form] = Form.useForm<any>();

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => { },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };
  const handleEditClick = (record: IPipelineItem) => {
    toggleEditing();
    setEditingIndex(record.id);
  };

  return (
    <>
      <Form form={form}>
        <Table
          loading={isLoading}
          dataSource={data}
          tableLayout='fixed'
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          title={() => <OpportunityTitleTable toggleCreateModal={toggleCreateModal} />}
          pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
          size={'middle'}
          rowKey={(record) => record.id}
        >
          <Column
            title="Name"
            dataIndex="name"
            key="name"
            render={(_, record: IPipelineItem) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='name'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
                rules={[isRequired('Name is required')]}
              />
            )}

          />
          <Column
            title="Contact Name"
            dataIndex="contactName"
            key="contactName"
            render={(_, record: IPipelineItem) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='name'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record.contact}
              />
            )}

          />
          <Column
            title="Email"
            dataIndex="email"
            key="email"
            render={(_, record: IPipelineItem) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='email'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record.contact}
              />
            )}

          />
          <Column
            title="Phone"
            dataIndex="phone"
            key="phone"
            render={(_, record: IPipelineItem) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='phone'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record.contact}
              />
            )}
          />

          <Column
            title="Stage"
            dataIndex="stage"
            key="stage"
            render={(_, record: IPipelineItem) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='name'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record.pipelineColumn}
              />
            )}

          />
          <Column
            title="Close Date"
            dataIndex="expectedClosing"
            key="expectedClosing"
            render={(_, record: IPipelineItem) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='expectedClosing'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
              />
            )}
          />
          <Column
            title="Expected Revenue"
            dataIndex="expectedRevenue"
            key="expectedRevenue"
            render={(_, record: IPipelineItem) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='expectedRevenue'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
                rules={[isRequired('Name is required')]}
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
        title='New Opportunity'
        callback={() => { }}
        isOpenModal={isOpenModal}
        toggleCreateModal={toggleCreateModal}
      >
        <CreateOpportunityForm />
      </CreateModal>
    </>
  )
}
