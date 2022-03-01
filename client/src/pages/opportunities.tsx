import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { EditableCell } from "@components/table/editable-cell";
import { Button, Form, Popconfirm, Space, Table } from "antd"
import Column from "antd/lib/table/Column"
import { useState } from "react";
import { useToggle } from "@hooks/useToggle";
import { showDeleteConfirm } from '@components/modal/delete-confirm';
import { OpportunityTitleTable } from "@components/opportunity/opportunity-title-table";


const Opportunities = () => {
  
  const [form] = Form.useForm<any>();
  const [isEditing, toggleEditing] = useToggle();
  const [editingIndex, setEditingIndex] = useState('');

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => { },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  return (
    <div className="opportunities-container">
      <Form form={form}>
        <Table
          // loading={isLoading}
          // dataSource={data}
          tableLayout='fixed'
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          title={() => <OpportunityTitleTable />}
          pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
          size={'middle'}
        >
          <Column title="Name" dataIndex="name" key="name"
            
          />
          <Column title="Contact Name" dataIndex="contactName" key="contactName"
            
          />
          <Column title="Email" dataIndex="email" key="email"
            
          />
          <Column title="Phone" dataIndex="phone" key="phone"
            
          />
          <Column title="Sales Person" dataIndex="sales" key="sales"
            
          />
          <Column title="Stage" dataIndex="stage" key="stage"
            
          />
          <Column title="Close Date" dataIndex="endDate" key="endDate"
            
          />
          <Column title="Product Revenue" dataIndex="price" key="price"
            
          />

          <Column title="Actions" dataIndex="actions" key="actions" width={150}
            render={(_, record: any) => (
              <Space size='small' style={{ width: '100%' }}>
                {isEditing && record.id === editingIndex ? (
                  <>
                    <Button type='link' onClick={() => {}}>
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
                      onClick={() => {}}
                    >
                      <FormOutlined />
                    </Button>

                    <Button
                      type='default'
                      onClick={() => showDeleteConfirm(() => { })}
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
    </div>
  )
}

export default Opportunities
