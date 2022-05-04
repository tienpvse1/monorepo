import { Table, Tag } from "antd";
import Column from "antd/lib/table/Column";
import { useCompanies } from '@modules/company/query/company.get';
import { ICompany } from "@modules/company/entity/company.entity";
import numberSeparator from "number-separator";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { PUBLIC_USER_INFO } from "@constance/cookie";
import { removeDuplicate } from "@util/array";
// import { TypeOfCompany } from '@components/company/type-of-company';


export const CompanyRankingRevenue = () => {
  const { data } = useCompanies();
  const [dataMap, setDataMap] = useState<ICompany[]>();
  const [loading, setLoading] = useState(true);

  const handleRevenue = (record: ICompany) =>
    record.contacts.reduce((acc, contact) => {
      return acc + contact.pipelineItems.reduce((acc2, item) => {
        if (item.pipelineColumn.isWon)
          return acc2 + item.expectedRevenue;
        else
          return acc2;
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
  //Filter created by follow account id
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  const handleFilter = () => {
    const accountFilter = data?.filter(
      (value) => value.creator?.id !== public_user_info.id
    );
    const accountFormat = accountFilter?.map((value) => ({
      text: `${value.creator?.firstName} ${value.creator?.lastName}`,
      value: `${value.creator?.firstName} ${value.creator?.lastName}`,
    }));
    const account = removeDuplicate(accountFormat, 'value');
    account?.unshift({
      text: 'My company',
      value: `${public_user_info.firstName} ${public_user_info.lastName}`,
    });
    return account;
  };
  const arrayFilter = useMemo(() => handleFilter(), [data]);

  useEffect(() => {
    const dataMap = data?.map((value) => (
      {
        ...value,
        revenue: handleRevenue(value)
      }
    ))
      .sort((a, b) => b.revenue - a.revenue)
      .map((newValue, index) => ({ ...newValue, index: ++index }))
    console.log("dataMap:", dataMap);

    setDataMap(dataMap);
    setLoading(false);
  }, [data])

  return (
    <Table
      style={{ paddingTop: '15px' }}
      loading={loading}
      dataSource={dataMap}
      tableLayout='fixed'
      title={() => <span style={{ fontSize: '20px' }}>Top Company</span>}
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
        // width={160}
        render={(_, record: ICompany) => (
          <span>
            {record.name}
          </span>
        )}
      />

      {/* <Column
        title="Email"
        dataIndex="email"
        key="email"
        width={250}
      /> */}

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
        title="Won Opportunity"
        dataIndex="opportunities"
        key="opportunities"
        // width={130}
        align="center"
        render={(_, record: ICompany) => (
          <span>
            {record.contacts.reduce((acc, value) => {
              return acc + value.pipelineItems.length
            }, 0)}
          </span>
        )}
      />

      <Column
        title="Rank"
        dataIndex="rank"
        key="rank"
        // width={100}
        render={(_, record: any) => (
          handleRank(record.revenue)
        )}
      />

      <Column
        title='Created By'
        dataIndex='username'
        key='username'
        // width={120}
        render={(_, record: ICompany) => (
          <span >
            {record?.creator?.firstName} {record?.creator?.lastName}
          </span>
        )}
        filters={arrayFilter}
        filterSearch={true}
        onFilter={(value, record) => {
          let fullName = `${record.creator?.firstName} ${record.creator?.lastName}`;
          return fullName.indexOf(value as string) === 0;
        }}
      />

      {/* <Column
        title="Type"
        dataIndex="type"
        key="type"
        width={120}
        render={(text) => (
          <TypeOfCompany type={text} />
        )}
      /> */}

    </Table>
  )
}
