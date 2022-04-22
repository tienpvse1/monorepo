import { ProductHeader } from '@components/product/header';
import { CourseData, course_Detail } from '@modules/product/entity/product.entity';
import { useMyCourses } from '@modules/product/query/products.get';
import { Table } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import numberSeparator from "number-separator";

const Product = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading } = useMyCourses(search, size, page);

  const expandedRowRender = (data: CourseData) => {
    const nestedColumns: any = [
      {
        title: 'No.',
        key: 'index',
        render: (_, __, index) => (++index),
        width: 70
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        render: (_, record: course_Detail) => (
          <span>
            {record.subjectDetail.name}
          </span>
        ),
      },
      {
        title: 'Code',
        key: 'code',
        render: (_, record: course_Detail) => (
          <span>
            {record.subjectDetail.code}
          </span>
        ),
      },
      {
        title: 'Is Active',
        key: 'country',
        render: (_, record: course_Detail) => (
          <span>{record.subjectDetail.isActive ? 'True' : 'False'}</span>
        )
      }
    ];

    return (
      <Table
        columns={nestedColumns}
        dataSource={data.course_Detail}
        pagination={false}
        rowKey={(record) => record.subjectDetail.id}
      />
    );
  };

  return (
    <div className='container-page'>
      <ProductHeader setSearch={setSearch} />
      <Table
        size='small'
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: 10,
          total: data?.total,
          onChange: (page, size) => {
            setPage(page);
            setSize(size);
          },
        }}
        dataSource={data?.data}
        rowKey={(record) => record.id}
        expandedRowRender={(record) => expandedRowRender(record)}
      >
        <Table.Column title='Id' dataIndex='id' key='id' />
        <Table.Column title='Name' dataIndex='name' key='nme' />
        <Table.Column
          title='Start date'
          key='startDate'
          render={(_, record: CourseData) => (
            <span>{moment(record.startDate).format('DD MMMM YYYY')}</span>
          )}
        />
        <Table.Column
          title='End date'
          key='endDate'
          render={(_, record: CourseData) => (
            <span>{moment(record.endDate).format('DD MMMM YYYY')}</span>
          )}
        />
        <Table.Column
          title='Certificate Exp'
          key='certificateExp'
          render={(_, record: CourseData) => (
            <span>{moment(record.certificateExp).format('DD MMMM YYYY')}</span>
          )}
        />
        <Table.Column
          title='Price'
          key='price'
          render={(_, record: CourseData) => (
            <span>{numberSeparator(record.price, '.')}đ</span>
          )}
        />
      </Table>
    </div>
  );
};
export default Product;
