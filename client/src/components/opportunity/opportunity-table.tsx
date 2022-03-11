import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { EditableCell } from "@components/table/editable-cell";
import { Button, Form, Popconfirm, Space, Table } from "antd"
import Column from "antd/lib/table/Column"
import { useState } from "react";
import { useToggle } from "@hooks/useToggle";
import { showDeleteConfirm } from '@components/modal/delete-confirm';
import { OpportunityTitleTable } from "@components/opportunity/opportunity-title-table";
import { GET_PIPELINE_ITEM_BY_ACCOUNT_ID, useQueryPipelineByAccountId } from "@modules/pipeline-items/query/pipeline-item.get";
import { useCookies } from "react-cookie";
import { PUBLIC_USER_INFO } from "@constance/cookie";
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { isRequired } from "@constance/rules-of-input-antd";
import { CreateModal } from '@components/modal/create-modal';
import { CreateOpportunityForm } from "./create-opportunity-form";
import { Link } from "react-router-dom";
import { SelectBoxContact } from "@components/contact/select-box-contact";
import { useContacts } from "@modules/contact/query/contact.get";
import moment from "moment";
import { useUpdatePipelineItem } from "@modules/pipeline-items/mutation/pipeline-items.update";
import { message } from 'antd'
import { usePostPipelineItems } from "@modules/pipeline-items/mutation/pipeline-items.post";
import { useQueryClient } from "react-query";
import { useDeletePipelineItems } from "@modules/pipeline-items/mutation/pipeline-items.delete";

interface SubmitFormCreateOpportunity {
  columnId: string;
  contactId: string;
  expectedClosing: string;
  expectedRevenue: string;
  internalDescription: string;
  internalNotes: string;
  name: string;
  productId: string;
  quantity: number;
  saleTeam: number;
}

export const OpportunitiesTable = () => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);

  const { data, isLoading } = useQueryPipelineByAccountId(id);
  const { data: contact } = useContacts(id);
  const { mutate: updateOpportunity } = useUpdatePipelineItem();
  const { mutate: createOpportunity } = usePostPipelineItems();
  const { mutate: removePipelineItems } = useDeletePipelineItems();
  const queryClient = useQueryClient();


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
    const { name, contact, expectedClosing } = record;
    form.setFieldsValue({
      name,
      contactId: contact.id,
      expectedClosing: moment(expectedClosing)
    })
  };

  const handleSave = async (id: string) => {
    try {
      const record = await form.validateFields();
      updateOpportunity({
        id,
        name: record.name,
        contactId: record.contactId
      }, {
        onSuccess: () => {
          message.success('Saved successfully !');
          toggleEditing();
        }
      })

    } catch (error) {
      return;
    }
  }

  const handleCreateOpportunity = (record: SubmitFormCreateOpportunity) => {
    const { name, columnId, contactId, internalNotes, internalDescription, productId, quantity } = record;
    createOpportunity({
      name,
      columnId,
      contactId,
      internalNotes,
      internalDescription,
      opportunityRevenue: {
        productId,
        quantity
      }
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_PIPELINE_ITEM_BY_ACCOUNT_ID);
        message.success('Created opportunity successfully !')
      },
    })
  }

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
          size={'small'}
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
                nameForm='name'
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
                selectBox={
                  <SelectBoxContact
                    formStyle={{ margin: 0 }}
                    label=""
                    data={contact}
                  />
                }
                nameForm='contactName'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record.contact}
              />
            )}

          />

          <Column
            title="Salesperson"
            dataIndex="accountId"
            key="accountId"
            width={175}
            render={(_, record: IPipelineItem) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='phone'
                nameForm='phone'
                customChildren={
                  <>
                    <Link className="my-link" to={`view-details/${record.id}`} >
                      {record.account.firstName}{record.account.lastName}
                    </Link>
                  </>
                }
                editing={false}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record.contact}
              />
            )}
          />

          <Column
            title="Expected Revenue"
            dataIndex="expectedRevenue"
            key="expectedRevenue"
            width={150}
            align="right"
            render={(_, record: IPipelineItem) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='expectedRevenue'
                nameForm='expectedRevenue'
                editing={false}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
                rules={[isRequired('Name is required')]}
              />
            )}
          />

          <Column
            title="Stage"
            dataIndex="stage"
            key="stage"
            width={100}
            render={(_, record: IPipelineItem) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='name'
                nameForm='stage'
                editing={false}
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
            width={150}
            render={(_, record: IPipelineItem) => (
              <EditableCell
                linkTo={`view-details/${record.id}`}
                dataIndex='expectedClosing'
                nameForm='expectedClosing'
                inputType='datePicker'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                record={record}
              />
            )}
          />

          <Column title="Actions" dataIndex="actions" key="actions" width={125}
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
                      onClick={() => showDeleteConfirm(() => removePipelineItems(record.id,
                        {
                          onSuccess: () => {
                            queryClient.invalidateQueries(GET_PIPELINE_ITEM_BY_ACCOUNT_ID);
                            message.success('Deleted opportunity successfully !')
                          }
                        }
                      ))}
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
        callback={handleCreateOpportunity}
        isOpenModal={isOpenModal}
        toggleCreateModal={toggleCreateModal}
      >
        <CreateOpportunityForm />
      </CreateModal>
    </>
  )
}
