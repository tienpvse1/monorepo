import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { EditableCell } from '@components/table/editable-cell';
import { Button, Form, Popconfirm, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { useState } from 'react';
import { useToggle } from '@hooks/useToggle';
import { showDeleteConfirm } from '@components/modal/delete-confirm';
import { OpportunityTitleTable } from '@components/opportunity/opportunity-title-table';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { isRequired } from '@constance/rules-of-input-antd';
import { CreateModal } from '@components/modal/create-modal';
import { CreateOpportunityForm } from './create-opportunity-form';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useUpdatePipelineItem } from '@modules/pipeline-items/mutation/pipeline-items.update';
import { message } from 'antd';
import { usePostPipelineItems } from '@modules/pipeline-items/mutation/pipeline-items.post';
import { useQueryClient } from 'react-query';
import { useDeletePipelineItems } from '@modules/pipeline-items/mutation/pipeline-items.delete';
import { removeDuplicate } from '@util/array';
import { dateFormat } from '@constance/date-format';
const { DEFAULT } = dateFormat;

interface OpportunitiesTableProps {
  dataSource: IPipelineItem[];
  isLoading: boolean;
  setDataOpportunity?: (value: []) => void;
  queryKey?: string | [any, any];
  searchMethod: (text: string, id?: string) => Promise<any>;
}

interface SubmitFormCreateOpportunity {
  columnId: string;
  contactId: string;
  expectedClosing: string | any;
  expectedRevenue: string;
  description: string;
  internalNotes: string;
  name: string;
  productId: string;
  quantity: number;
  saleTeam: number;
  courseId: string;
  priority: number;
}

export const OpportunitiesTable: React.FC<OpportunitiesTableProps> = ({
  dataSource,
  isLoading,
  setDataOpportunity,
  searchMethod,
  queryKey
}) => {
  const stageFilter = dataSource?.map((opportunity) => ({
    text: opportunity.pipelineColumn?.name,
    value: opportunity.pipelineColumn?.name,
  }));

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
      expectedClosing: expectedClosing ? moment(expectedClosing) : '',
    });
  };

  const handleSave = async (id: string) => {
    try {
      const record = await form.validateFields();
      updateOpportunity(
        {
          id,
          name: record.name,
          expectedClosing: record.expectedClosing
            ? record.expectedClosing.format(DEFAULT)
            : '',
        },
        {
          onSuccess: () => {
            message.success('Saved successfully !');
            toggleEditing();
          },
        }
      );
    } catch (error) {
      return;
    }
  };

  const handleCreateOpportunity = (record: SubmitFormCreateOpportunity) => {
    const {
      name,
      columnId,
      contactId,
      internalNotes,
      description,
      expectedClosing,
      courseId,
      quantity,
      priority
    } = record;
    createOpportunity(
      {
        name,
        columnId,
        contactId,
        internalNotes,
        description,
        expectedClosing: expectedClosing ? expectedClosing.format(DEFAULT) : '',
        priority,
        opportunityRevenue: {
          courseId,
          quantity,
        },
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries(queryKey);
          message.success('Created opportunity successfully !');
        },
      }
    );
  };

  return (
    <>
      <Form form={form}>
        <Table
          scroll={{ x: 1300 }}
          loading={isLoading}
          dataSource={dataSource}
          tableLayout='fixed'
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          title={() => (
            <OpportunityTitleTable
              setDataOpportunity={setDataOpportunity}
              searchMethod={searchMethod}
              toggleCreateModal={toggleCreateModal}
            />
          )}
          pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
          size={'small'}
          rowKey={(record) => record.id}
        >
          <Column
            title='Name'
            dataIndex='name'
            key='name'
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
            sorter={(a, b) => ('' + a.name).localeCompare(b.name)}
          />

          <Column
            title='Contact Name'
            dataIndex='contactName'
            key='contactName'
            width={200}
            render={(_, record: IPipelineItem) => (
              <>
                <Link className='my-link' to={`view-details/${record.id}`}>
                  {record.contact?.name}
                </Link>
              </>
            )}
            sorter={(a, b) =>
              ('' + a.contact.name).localeCompare(b.contact.name)
            }
          />

          <Column
            title='Salesperson'
            dataIndex='accountId'
            key='accountId'
            width={175}
            render={(_, record: IPipelineItem) => (
              <>
                <Link className='my-link' to={`view-details/${record.id}`}>
                  {record.account.firstName} {record.account.lastName}
                </Link>
              </>
            )}
            sorter={(a, b) =>
              ('' + a.account.username).localeCompare(b.account.username)
            }
          />

          <Column
            title='Expected Revenue'
            dataIndex='expectedRevenue'
            key='expectedRevenue'
            width={150}
            align='right'
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
            sorter={(a, b) => a.expectedRevenue - b.expectedRevenue}
          />

          <Column
            title='Stage'
            dataIndex='stage'
            key='stage'
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
            filters={removeDuplicate(stageFilter, 'value')}
            //@ts-ignore
            onFilter={(value, record) =>
              record.pipelineColumn.name.indexOf(value as string) === 0
            }
          />
          <Column
            title='Is Lost'
            dataIndex='isLose'
            key='isLose'
            width={100}
            render={(_, record: IPipelineItem) => (
              <span>{record.isLose ? 'Yes' : 'No'}</span>
            )}
            filters={[{
              text: 'Yes',
              value: true
            }, {
              text: 'No',
              value: false
            }]}
            onFilter={(value, record) => record.isLose === value}
          />

          <Column
            title='Close Date'
            dataIndex='expectedClosing'
            key='expectedClosing'
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
            sorter={(a, b) =>
              moment(a.expectedClosing).diff(moment(b.expectedClosing))
            }
          />

          <Column
            title='Actions'
            dataIndex='actions'
            key='actions'
            fixed={'right'}
            width={125}
            render={(_, record: IPipelineItem) => (
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
                      disabled={record.pipelineColumn.isWon || record.isLose && true}
                      type='default'
                      onClick={() =>
                        showDeleteConfirm(() =>
                          removePipelineItems(record.id, {
                            onSuccess: () => {
                              queryClient.invalidateQueries(queryKey);
                              message.success(
                                'Deleted opportunity successfully !'
                              );
                            },
                          })
                        )
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
        title='New Opportunity'
        callback={handleCreateOpportunity}
        isOpenModal={isOpenModal}
        toggleCreateModal={toggleCreateModal}
      >
        <CreateOpportunityForm />
      </CreateModal>
    </>
  );
};
