import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { IContact } from '@modules/contact/entity/contact.entity';
import { usePaginatedContacts } from '@modules/contact/query/contact.get';
import { Button, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const { Column } = Table;
interface ManagerContactTableProps {}

export const ManagerContactTable: React.FC<ManagerContactTableProps> = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(10);
  const { data, isLoading } = usePaginatedContacts(size, currentPage);
  return (
    <div>
      {data && (
        <Table
          dataSource={data.data}
          loading={isLoading}
          pagination={{
            total: data.total,
            showSizeChanger: true,
            pageSize: size,
            current: currentPage,
          }}
          onChange={({ pageSize, current }) => {
            setCurrentPage(current);
            setSize(pageSize);
          }}
          rowKey={(row) => row.id}
        >
          <Column title='Name' dataIndex='name' key='name' />
          <Column title='Address' dataIndex='address' key='address' />
          <Column
            title='Email'
            dataIndex='email'
            key='email'
            render={(_, record: IContact) => (
              <Link className='my-link' to={`view-details/${record.id}`}>
                {record.email}
              </Link>
            )}
            sorter={(a, b) => ('' + a.email).localeCompare(b.email)}
          />
          <Column
            title='Phone Number'
            dataIndex='phone'
            key='phone'
            render={(_, record: IContact) => (
              <Link className='my-link' to={`view-details/${record.id}`}>
                {record.phone}
              </Link>
            )}
          />
          <Column title='Company' dataIndex='companyName' key='companyName' />
          <Column
            title='Job Position'
            dataIndex='jobPosition'
            key='jobPosition'
            render={(_, record: IContact) => <>{record.jobPosition}</>}
            sorter={(a, b) => ('' + a.jobPosition).localeCompare(b.jobPosition)}
          />

          <Column
            title='Tags'
            dataIndex='tags'
            key='tags'
            render={(_, record: IContact) =>
              record.tags.map((tag) => (
                <Tag
                  style={{ marginTop: '3px' }}
                  color={tag.color}
                  key={tag.id}
                >
                  {tag.name}
                </Tag>
              ))
            }
          />

          <Column
            title='Created By'
            dataIndex='username'
            key='username'
            width={120}
            render={(_, record: IContact) => (
              <Link className='my-link' to={`view-details/${record?.id}`}>
                {record?.account?.firstName} {record?.account?.lastName}
              </Link>
            )}
          />

          <Column
            title='Action'
            dataIndex='action'
            key='action'
            fixed={'right'}
            render={(_, record: IContact) => (
              <Space size='small' style={{ width: '100%' }}>
                <>
                  <Button type='ghost' shape='round'>
                    <FormOutlined />
                  </Button>

                  <Button type='default' shape='round' danger>
                    <DeleteOutlined />
                  </Button>
                </>
              </Space>
            )}
          />
        </Table>
      )}
    </div>
  );
};
