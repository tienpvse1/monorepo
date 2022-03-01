import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { ProductTitleTable } from '@components/product/product-title-table';
import { EditableCell } from '@components/table/editable-cell';
import { IProduct } from '@modules/product/enity/product.enity';
import { useQueryProducts } from '@modules/product/query/products.get';
import { Button, Form, Popconfirm, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import moment from 'moment';
import { useState } from 'react';
import { useToggle } from '@hooks/useToggle';
import { showDeleteConfirm } from '@components/modal/delete-confirm';
import { useUpdateProduct } from '@modules/product/mutation/product.update';

const Product = () => {
  const dateFormat = 'YYYY-MM-DD';

  const { data, isLoading } = useQueryProducts();
  const { updateProduct } = useUpdateProduct();

  const [isEditing, toggleEditing] = useToggle();
  const [editingIndex, setEditingIndex] = useState('');

  const [form] = Form.useForm<IProduct>();

  const handleEditClick = (record: IProduct) => {
    toggleEditing();
    setEditingIndex(record.id);
    const { name, startDate, endDate, price } = record;
    form.setFieldsValue({
      name,
      startDate: moment(startDate),
      endDate: moment(endDate),
      price,
    });
  };

  const handleSave = async (id: string) => {
    try {
      const record = await form.validateFields();
      toggleEditing();
      updateProduct({
        id,
        ...record,
        startDate: record.startDate.format(dateFormat),
        endDate: record.endDate.format(dateFormat),
      });
    } catch (error) {
      return;
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {},
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  return (
    <div className='product-container'>
      <Form form={form}>
        <Table
          loading={isLoading}
          dataSource={data}
          tableLayout='fixed'
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          title={() => <ProductTitleTable />}
          pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
          size={'large'}
        >
          <Column
            title='Name'
            dataIndex='name'
            key='name'
            render={(_, record: IProduct) => (
              <EditableCell
                dataIndex='name'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                title='Name'
                record={record}
                rules={[
                  {
                    required: true,
                    message: 'Name is required',
                  },
                ]}
              />
            )}
          />
          <Column
            title='Start Date'
            dataIndex='startDate'
            key='startDate'
            render={(_, record: IProduct) => (
              <EditableCell
                inputType='datePicker'
                dataIndex='startDate'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                title='Start Date'
                record={record}
                rules={[
                  {
                    required: true,
                    message: 'Start date is required',
                  },
                ]}
              />
            )}
          />
          <Column
            title='End Date'
            dataIndex='endDate'
            key='endDate'
            render={(_, record: IProduct) => (
              <EditableCell
                inputType='datePicker'
                dataIndex='endDate'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                title='End Date'
                record={record}
                rules={[
                  {
                    required: true,
                    message: 'End date is required',
                  },
                ]}
              />
            )}
          />
          <Column
            title='Price'
            dataIndex='price'
            key='price'
            render={(_, record: IProduct) => (
              <EditableCell
                dataIndex='price'
                editing={isEditing}
                editingIndex={editingIndex}
                recordIndex={record.id}
                title='End Date'
                record={record}
                rules={[
                  {
                    required: true,
                    message: 'price is required',
                  },
                ]}
              />
            )}
          />

          <Column title="Actions" dataIndex="actions" key="actions" width={150}
            render={(_, record: IProduct) => (
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
                      type='default'
                      onClick={() => showDeleteConfirm(() => {})}
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
  );
};
export default Product;
