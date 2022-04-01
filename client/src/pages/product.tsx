import { ProductHeader } from '@components/product/header';
import { CourseData } from '@modules/product/entity/product.entity';
import { useCourses } from '@modules/product/query/products.get';
import { Table } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const Product = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState('');
  const { data, isLoading } = useCourses(search, size, page);
  return (
    <div className='container-page'>
      <ProductHeader setSearch={setSearch} />
      <Table
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: 10,
          total: data?.paging.totalCount,
          onChange: (page, size) => {
            setPage(page);
            setSize(size);
          },
        }}
        dataSource={data?.data}
        rowKey={(record) => record.id}
      >
        <Table.Column title='Id' dataIndex='id' key='id' />
        <Table.Column title='Name' dataIndex='name' key='nme' />
        <Table.Column
          title='Start date'
          key='startDate'
          render={(text, record: CourseData) => (
            <span>{moment(record.startDate).format('DD MMMM YYYY')}</span>
          )}
        />
        <Table.Column
          title='End date'
          key='endDate'
          render={(text, record: CourseData) => (
            <span>{moment(record.endDate).format('DD MMMM YYYY')}</span>
          )}
        />
      </Table>
    </div>
  );
};
export default Product;
