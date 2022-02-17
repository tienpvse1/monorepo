import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Loading } from '@components/loading/loading';
import { useContacts } from '@modules/contact/query/contact.get';
import { Button, Space, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { ContactHeader } from './contact-header';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {},
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

export const ContactData = () => {
  const { data, isLoading, error } = useContacts();
  const title = () => <ContactHeader />;
  if (isLoading) return <Loading />;

  return (
    <>
      {data && (
        <Table
          tableLayout='fixed'
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          title={title}
          pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
          dataSource={data}
          size={'large'}
        >
          <Column
            title='Name'
            dataIndex='name'
            key='name'
            render={(text) => <a>{text}</a>}
          />
          <Column title='Address' dataIndex='address' key='address' />
          <Column title='Phone Number' dataIndex='phone' key='phone' />
          <Column
            title='Type'
            dataIndex='type'
            key='type'
            render={(text) => (
              <span>
                <Tag color={'volcano'} key={text.type}>
                  {text.toUpperCase()}
                </Tag>
              </span>
            )}
          />
          <Column
            title='Action'
            dataIndex='action'
            key='action'
            render={() => (
              <Space size='small' style={{ width: '100%' }}>
                <Button type='ghost' shape='round'>
                  <FormOutlined />
                </Button>

                <Button type='default' shape='round' danger>
                  <DeleteOutlined />
                </Button>
              </Space>
            )}
          />
        </Table>
      )}
    </>
  );
};
