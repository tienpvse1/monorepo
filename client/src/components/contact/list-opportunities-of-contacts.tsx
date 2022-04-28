import { dateFormat } from '@constance/date-format'
import { envVars } from '@env/var.env'
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity'
import { Table, Tag } from 'antd'
import Column from 'antd/lib/table/Column'
import moment from 'moment'
import { Link } from 'react-router-dom'
const { DEFAULT } = dateFormat;
import { removeDuplicate } from '@util/array';
import { useState } from 'react'
import numberSeparator from "number-separator";

interface ListOfContactOpportunitiesProps {
  dataSource: IPipelineItem[]
}

export const ListOpportunitiesOfContacts: React.FC<ListOfContactOpportunitiesProps> = ({
  dataSource
}) => {

  const [expectedRevenue, setExpectedRevenue] = useState(() => {
    return dataSource.reduce((acc, value) => acc + value.expectedRevenue, 0);
  });

  //filter stage
  const stageFilter = dataSource?.map((opportunity) => ({
    text: opportunity.pipelineColumn?.name,
    value: opportunity.pipelineColumn?.name,
  }));

  return (
    <Table
      dataSource={dataSource}
      tableLayout='fixed'
      title={() => <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`${envVars.VITE_BE_DOMAIN}/files/crown.png`}
            width={46}
            height={46}
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
      onChange={(_, __, ___, extra) => {
        setExpectedRevenue(extra.currentDataSource.reduce((acc, value) =>
          acc + value.expectedRevenue, 0))
      }}
      footer={() => (
        <div style={{ marginTop: '5px' }}>
          <Tag style={{ fontSize: '16px' }}>Total Estimated Revenue: </Tag>
          <span style={{ fontSize: '16px' }}>{numberSeparator(expectedRevenue, '.')}đ</span>
        </div>
      )}
      expandedRowRender={(record) =>
        <span>Expected Revenue: {numberSeparator(record.expectedRevenue, '.')}đ</span>}
      expandable={{
        columnWidth: 35
      }}
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
        // width={150}
        render={(_, record: IPipelineItem) => (
          <Link className="my-link" to={`/opportunities/view-details/${record.id}`} >{record.name}</Link>
        )}
        sorter={(a, b) => ('' + a.name).localeCompare(b.name)}
      />

      <Column
        title='Stage'
        dataIndex='stage'
        key='stage'
        width={80}
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
        title='Status'
        dataIndex='isLose'
        key='isLose'
        width={80}
        render={(_, record: IPipelineItem) => (
          <Tag
            color={record.isLose ? 'default' : 'green'}
          >
            {record.isLose ? 'Lost' : 'Alive'}
          </Tag>
        )}
        filters={[{
          text: 'Lost',
          value: true
        }, {
          text: 'Alive',
          value: false
        }]}
        onFilter={(value, record) => record.isLose === value}
      />

      <Column
        title="Assigned date"
        dataIndex="createdAt"
        key="createdAt"
        width={130}
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
        width={110}
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
