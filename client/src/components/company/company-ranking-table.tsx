import { Table, Tag } from "antd";
import Column from "antd/lib/table/Column";
import { useCompanies } from '@modules/company/query/company.get';
import { ICompany } from "@modules/company/entity/company.entity";
import numberSeparator from "number-separator";
import moment from "moment";
import { dateFormat } from "@constance/date-format";
import { useEffect, useState } from "react";
const { CRUD_AT } = dateFormat;

export const CompanyRankingTable = () => {
  const { data, isLoading } = useCompanies();
  const [dataMap, setDataMap] = useState<ICompany[]>();

  const handleRevenue = (record: ICompany) =>
    record?.contacts?.reduce((acc, contact) => {
      return acc + contact?.pipelineItems?.reduce((acc2, item) => {
        return acc2 + item.expectedRevenue;
      }, 0)
    }, 0)

  const handleRank = (revenue: number) => {
    if (revenue >= 100000000) {
      return <Tag color={'gold'}>Gold</Tag>
    }
    if (revenue >= 50000000) {
      return <Tag color={'default'}>Silver</Tag>
    } else {
      return <Tag color={'volcano'}>Bronze</Tag>
    }
  }

  useEffect(() => {
    const dataMap = data?.map((value) => (
      {
        ...value,
        revenue: handleRevenue(value)
      }
    ))
      .sort((a, b) => b.revenue - a.revenue)
      .map((newValue, index) => ({ ...newValue, index: ++index }))

    setDataMap(dataMap);
  }, [data])

  return (
    <Table
      loading={isLoading}
      dataSource={dataMap}
      tableLayout='fixed'
      title={() => <span style={{ fontSize: '18px' }}>Top Company</span>}
      pagination={
        {
          position: ['bottomCenter'],
          style: { fontSize: 15 }
        }
      }
      size={'small'}
      rowKey={(record) => record.id}
    >
      <Column
        title="No."
        width={50}
        render={(_, record: any) => (
          <span>{record.index}</span>
        )}
      />

      <Column
        title="Name"
        dataIndex="name"
        key="name"
        render={(_, record: ICompany) => (
          <span>
            {record.name}
          </span>
        )}
      />

      <Column
        title="Phone"
        dataIndex="mobile"
        key="mobile"
      />

      <Column
        title="Revenue"
        dataIndex="revenue"
        key="revenue"
        render={(value) => (
          <span>
            {numberSeparator(value, '.')}đ
          </span>
        )}
      />
      <Column
        title="Rank"
        dataIndex="rank"
        key="rank"
        width={100}
        render={(_, record: any) => (
          handleRank(record.revenue)
        )}
      />

      <Column
        title="Created Date"
        dataIndex="createdAt"
        key="createdAt"
        render={(_, record: any) => (
          <span >
            {moment(record.createdAt).format(CRUD_AT)}
          </span>
        )}
      />
    </Table>
  )
}
