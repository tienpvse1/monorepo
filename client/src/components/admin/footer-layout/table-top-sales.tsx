import { MoreOutlined } from '@ant-design/icons';
import { WrapperRowTitle } from '@components/layout/title-pages/wrapper-row-title';
import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { ColumnName } from './column-name';
import { ColumnRank } from './column-rank';

export const TableTopSales = () => {
  const data = [
    {
      key: 1,
      name: `Adriana Jacobs`,
      amount: 2347.67,
      products: 130,
      premium: 80,
      rank: `Gold`,
    },
    {
      key: 2,
      name: `Ian Chestnut`,
      amount: 2256.23,
      products: 119,
      premium: 73,
      rank: `Silver`,
    },
    {
      key: 3,
      name: `Tracy Aksum`,
      amount: 2347.67,
      products: 130,
      premium: 67,
      rank: `Silver`,
    },
    {
      key: 4,
      name: `Tracy Kasam`,
      amount: 1234.67,
      products: 130,
      premium: 61,
      rank: `Gold`,
    },
    {
      key: 5,
      name: `Scott Waiter`,
      amount: 1873.67,
      products: 130,
      premium: 56,
      rank: `Bronze`,
    },
    {
      key: 6,
      name: `Alex Waiter`,
      amount: 1873.67,
      products: 130,
      premium: 56,
      rank: `Bronze`,
    }
  ];
  return (
    <>
      <WrapperRowTitle
        className="wrapper-title-page"
        title="Top Sales Rep"
        titleSize="21px"
      />
      <Table
        dataSource={data}
        pagination={false}
        scroll={{ y: 330 }} >
        <Column title='Name' dataIndex='name' key='name' width={350}
          render={(text, _, index) =>
            <ColumnName key={text} name={text} indexStaff={index} />
          }
        />
        <Column title='Amount' dataIndex='amount' key='amount'
          render={(amount) => <span className="column-amount"> $ {amount}</span>}
        />
        <Column title='Products' dataIndex='products' key='products'
          render={(product) => <span className="column-products">{`${product} Products`}</span>}
        />
        <Column title='Premium' dataIndex='premium' key='premium'
          render={(premium) => <span className="column-premium">{`${premium} Premiums`}</span>}
        />
        <Column title='Rank' dataIndex='rank' key='rank'
          render={(rank) => <ColumnRank name={rank} />}
        />
        <Column title='Action' dataIndex='action' key='action'
          render={() => <MoreOutlined style={{ fontSize: '23px' }} />}
        />
      </Table>
    </>
  )
};
