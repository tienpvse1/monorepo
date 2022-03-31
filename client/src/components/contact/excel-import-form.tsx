import { Table, Tag } from "antd"
import Column from 'antd/lib/table/Column'

export const ExcelImportForm = () => {

  const data = [
    {
      id: '1',
      name: 'Name 1',
      address: 'Address 1',
      phone: '0942348923',
      birth: '27/10/1995',
      email: 'tienpvse@gmail.com',
      type: 'personal',
      company: 'Vietjet Academy'
    },
    {
      id: '2',
      name: 'Name 2',
      address: 'Address 2',
      phone: '0942348923',
      birth: '27/10/1995',
      email: 'nghuuchuong@gmail.com',
      type: 'personal',
      company: 'Vietjet Academy'
    },
    {
      id: '3',
      name: 'Name 3',
      address: 'Address 3',
      phone: '0942348923',
      birth: '27/10/1995',
      email: 'nakiet99@gmail.com',
      type: 'personal',
      company: 'Vietjet Academy'
    },
    {
      id: '4',
      name: 'Name 4',
      address: 'Address 4',
      phone: '0942348923',
      birth: '27/10/1995',
      email: 'good66612@gmail.com',
      type: 'personal',
      company: 'Vietjet Academy'
    }
  ]

  return (
    <Table
      dataSource={data}
      bordered
      style={{ padding: '20px' }}
      tableLayout='fixed'
      title={() => <>
        <span
          style={{
            fontSize: '18px',
            color: 'rgba(0,0,0,0.7)',
            fontWeight: '700',
          }}
        >
          Example Import Form:
        </span>
      </>}
      pagination={false}
      size={'small'}
      rowKey={(record) => record.id}
      footer={() =>
        <div style={{ fontSize: '16px', marginTop: '15px' }}>
          <Tag style={{ fontSize: '16px' }} color={'gold'}>WARNING:</Tag>
          Email, name is not duplicated
        </div>
      }
    >
      <Column
        title="Name"
        width={100}
        render={(_, record: any) => <span>{record.name}</span>}
      />

      <Column
        title="Address"
        dataIndex="address"
        key="address"
        width={150}
        render={(_, record: any) => (
          <span>{record.address}</span>
        )}
      />

      <Column
        title='Phone'
        dataIndex='phone'
        key='phone'
        width={120}
        render={(_, record: any) => (
          <span>{record.phone}</span>
        )}
      />

      <Column
        title="Birth"
        dataIndex="birth"
        key="birth"
        width={110}
        render={(_, record: any) => (
          <span>{record.birth}</span>
        )}

      />
      <Column
        title="Email"
        dataIndex="email"
        key="email"
        render={(_, record: any) => (
          <span>{record.email}</span>
        )}
      />
      <Column
        title="Type"
        dataIndex="type"
        key="type"
        width={100}
        render={(_, record: any) => (
          <span>{record.type}</span>
        )}
      />
      <Column
        title="Company"
        dataIndex="company"
        key="company"
        width={150}
        render={(_, record: any) => (
          <span>{record.company}</span>
        )}
      />
    </Table>
  )
}
