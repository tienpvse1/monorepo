import { dateFormat } from '@constance/date-format'
import { envVars } from '@env/var.env'
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity'
import { Table } from 'antd'
import Column from 'antd/lib/table/Column'
import moment from 'moment'
import { Link } from 'react-router-dom'
const { DEFAULT } = dateFormat;
interface ListOfContactOpportunitiesProps {
  dataSource: IPipelineItem[]
}

export const ListOpportunitiesOfContacts: React.FC<ListOfContactOpportunitiesProps> = ({
  dataSource
}) => {
  return (
    <Table
      dataSource={dataSource}
      tableLayout='fixed'
      title={() => <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`${envVars.VITE_BE_DOMAIN}/files/crown.png`}
            width={40}
            height={40}
          />
          <span
            style={{
              fontSize: '20px',
              color: 'rgba(0,0,0,0.7)',
              fontWeight: '700',
              marginLeft: '10px'
            }}
          >
            Opportunities {`(${dataSource?.length})`}
          </span>
        </div>
      </>}
      pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
      size={'small'}
      rowKey={(record) => record.id}
    >
      <Column
        title="No."
        width={50}
        render={(_, __, index) => (++index)}
      />
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        render={(_, record: IPipelineItem) => (
          <Link className="my-link" to={`/opportunities/view-details/${record.id}`} >{record.name}</Link>
        )}
        sorter={(a, b) => ('' + a.name).localeCompare(b.name)}
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
        title="Assigned date"
        dataIndex="createdAt"
        key="createdAt"
        render={(_, record: IPipelineItem) => (
          <Link className="my-link" to={`/opportunities/view-details/${record.id}`} >{moment(record.createdAt).format(DEFAULT)}</Link>
        )}
        sorter={(a, b) =>
          moment(a.createdAt).diff(moment(b.createdAt))
        }
      />
      <Column
        title="Close Date"
        dataIndex="expectedClosing"
        key="expectedClosing"
        render={(_, record: IPipelineItem) => (
          <Link className="my-link" to={`/opportunities/view-details/${record.id}`} >{record.expectedClosing}</Link>
        )}
        sorter={(a, b) =>
          moment(a.expectedClosing).diff(moment(b.expectedClosing))
        }
      />
    </Table>
  )
}
