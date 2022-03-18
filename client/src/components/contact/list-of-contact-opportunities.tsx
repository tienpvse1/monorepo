import { dateFormat } from '@constance/date-format'
import { envVars } from '@env/var.env'
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity'
import { Table } from 'antd'
import Column from 'antd/lib/table/Column'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
const { DEFAULT } = dateFormat;
interface ListOfContactOpportunitiesProps {
  dataSource: IPipelineItem[]
}

export const ListOfContactOpportunities: React.FC<ListOfContactOpportunitiesProps> = ({
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
      />
      <Column
        title="Assigned date"
        dataIndex="createdAt"
        key="createdAt"
        render={(_, record: IPipelineItem) => (
          <Link className="my-link" to={`/opportunities/view-details/${record.id}`} >{moment(record.createdAt).format(DEFAULT)}</Link>
        )}
      />
      <Column
        title="Expected revenue"
        dataIndex="expectedRevenue"
        key="expectedRevenue"
      // render={(_, record: IPipelineItem) => (
      //   <Link className="my-link" to={`view-details/${record.id}`} >{record.expectedRevenue}</Link>
      // )}
      />
      <Column
        title="Close Date"
        dataIndex="expectedClosing"
        key="expectedClosing"
        render={(_, record: IPipelineItem) => (
          <Link className="my-link" to={`/opportunities/view-details/${record.id}`} >{record.expectedClosing}</Link>
        )}
      />
    </Table>
  )
}
