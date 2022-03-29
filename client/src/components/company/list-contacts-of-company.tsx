import { dateFormat } from '@constance/date-format'
import { envVars } from '@env/var.env'
import { IContact } from '@modules/contact/entity/contact.entity'
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity'
import { Table } from 'antd'
import Column from 'antd/lib/table/Column'
import moment from 'moment'
import { Link } from 'react-router-dom'
const { DEFAULT } = dateFormat;

interface ListContactsOfCompanyProps {
  dataSource: IContact[]
}

export const ListContactsOfCompany: React.FC<ListContactsOfCompanyProps> = ({
  dataSource
}) => {
  return (
    <Table
      dataSource={dataSource}
      tableLayout='fixed'
      title={() => <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`${envVars.VITE_BE_DOMAIN}/files/contact.png`}
            width={35}
            height={35}
          />
          <span
            style={{
              fontSize: '20px',
              color: 'rgba(0,0,0,0.7)',
              fontWeight: '700',
              marginLeft: '10px'
            }}
          >
            Contacts {`(${dataSource?.length})`}
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
          <Link className="my-link" to={`/contact/view-details/${record.id}`} >{record.name}</Link>
        )}
        sorter={(a, b) => ('' + a.name).localeCompare(b.name)}
      />
      <Column
        title="Email"
        dataIndex="email"
        key="email"
        render={(_, record: IPipelineItem) => (
          <Link className="my-link" to={`/contact/view-details/${record.id}`} >{record.email}</Link>
        )}
        sorter={(a, b) => ('' + a.email).localeCompare(b.email)}
      />
      <Column
        title="Phone Number"
        dataIndex="phone"
        key="phone"
        render={(_, record: IPipelineItem) => (
          <Link className="my-link" to={`/contact/view-details/${record.id}`} >{record.phone}</Link>
        )}
      />
      <Column
        title="Assigned Date"
        dataIndex="createdAt"
        key="createdAt"
        render={(_, record: IPipelineItem) => (
          <Link className="my-link" to={`/contact/view-details/${record.id}`} >{moment(record.createdAt).format(DEFAULT)}</Link>
        )}
        sorter={(a, b) =>
          moment(a.createdAt).diff(moment(b.createdAt))
        }
      />

    </Table>
  )
}
