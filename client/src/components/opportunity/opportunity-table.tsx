import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Form, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { useToggle } from '@hooks/useToggle';
import { showDeleteConfirm } from '@components/modal/delete-confirm';
import { OpportunityTitleTable } from '@components/opportunity/opportunity-title-table';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { CreateModal } from '@components/modal/create-modal';
import { CreateOpportunityForm } from './create-opportunity-form';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { message } from 'antd';
import { usePostPipelineItems } from '@modules/pipeline-items/mutation/pipeline-items.post';
import { useQueryClient } from 'react-query';
import { useDeletePipelineItems } from '@modules/pipeline-items/mutation/pipeline-items.delete';
import { removeDuplicate } from '@util/array';
import { dateFormat } from '@constance/date-format';
import { useHandleNavigate } from '@hooks/useHandleNavigate';
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
  const navigate = useNavigate();
  const { navigateRole } = useHandleNavigate();

  const { mutate: createOpportunity } = usePostPipelineItems();
  const { mutate: removePipelineItems } = useDeletePipelineItems();
  const queryClient = useQueryClient();

  const [isOpenModal, toggleCreateModal] = useToggle();
  const [form] = Form.useForm<any>();

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => { },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
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
      priority,
      expectedRevenue
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
        expectedRevenue: expectedRevenue ? Number(expectedRevenue) : 0,
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
              <Link className='my-link' to={`view-details/${record.id}`}>
                {record.name}
              </Link>
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
                <Link className='my-link' to={`${navigateRole}contact/view-details/${record.contact.id}`}>
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
                  {record.account?.firstName} {record.account?.lastName}
                </Link>
              </>
            )}
            sorter={(a, b) =>
              ('' + a.account?.username).localeCompare(b.account?.username)
            }
          />

          <Column
            title='Expected Revenue'
            dataIndex='expectedRevenue'
            key='expectedRevenue'
            width={150}
            align='right'
            render={(_, record: IPipelineItem) => (
              <Link className='my-link' to={`view-details/${record.id}`}>
                {record.expectedRevenue}
              </Link>
            )}
            sorter={(a, b) => a.expectedRevenue - b.expectedRevenue}
          />

          <Column
            title='Stage'
            dataIndex='stage'
            key='stage'
            width={100}
            render={(_, record: IPipelineItem) => (
              <Link className='my-link' to={`view-details/${record.id}`}>
                {record.pipelineColumn.name}
              </Link>
            )}
            filters={removeDuplicate(stageFilter, 'value')}
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
              <Link className='my-link' to={`view-details/${record.id}`}>
                {record.expectedClosing}
              </Link>
            )}
            sorter={(a, b) =>
              moment(a.expectedClosing).diff(moment(b.expectedClosing))
            }
          />

          <Column
            title='Action'
            dataIndex='action'
            key='action'
            fixed={'right'}
            width={125}
            render={(_, record: IPipelineItem) => (
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
                    disabled={record.pipelineColumn?.isWon || record.isLose && true}
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
