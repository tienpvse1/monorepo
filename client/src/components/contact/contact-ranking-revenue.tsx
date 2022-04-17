import { PUBLIC_USER_INFO } from "@constance/cookie";
import { IContact } from "@modules/contact/entity/contact.entity";
import { useQueryAllContacts } from "@modules/contact/query/contact.get";
import { removeDuplicate } from "@util/array";
import { Table, Tag } from "antd";
import Column from "antd/lib/table/Column";
import numberSeparator from "number-separator";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";

export const ContactRankingRevenue = () => {
  const { data, isLoading } = useQueryAllContacts();
  const [dataMap, setDataMap] = useState<IContact[]>();

  //filter created by follow account id
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);

  const handleFilter = () => {
    const accountFilter = data?.filter(
      (value) => value.account?.id !== public_user_info.id
    );
    const accountFormat = accountFilter?.map((value) => ({
      text: `${value.account?.firstName} ${value.account?.lastName}`,
      value: `${value.account?.firstName} ${value.account?.lastName}`,
    }));
    const account = removeDuplicate(accountFormat, 'value');
    account?.unshift({
      text: 'My contacts',
      value: `${public_user_info.firstName} ${public_user_info.lastName}`,
    });
    return account;
  };
  const arrayFilter = useMemo(() => handleFilter(), [data]);

  //handle method
  const handleRank = (revenue: number) => {
    if (revenue >= 50000000) {
      return <Tag color={'gold'}>Gold</Tag>
    }
    if (revenue >= 25000000) {
      return <Tag color={'default'}>Silver</Tag>
    } else {
      return <Tag color={'volcano'}>Bronze</Tag>
    }
  }

  const handleRevenue = (record: IContact) =>
    record.pipelineItems.reduce((acc, item) => {
      if (item.pipelineColumn.isWon)
        return acc + item.expectedRevenue;
      else
        return 0;
    }, 0)

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
      style={{ paddingTop: '15px' }}
      loading={isLoading}
      dataSource={dataMap}
      tableLayout='fixed'
      title={() => <span style={{ fontSize: '20px' }}>Top Contact</span>}
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
        width={150}
        render={(_, record: IContact) => (
          <span>
            {record.name}
          </span>
        )}
      />

      <Column
        title="Email"
        dataIndex="email"
        key="email"
        width={250}
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
        title="Opportunities"
        dataIndex="opportunities"
        key="opportunities"
        width={110}
        align="center"
        render={(_, record: IContact) => (
          <span>
            {record.pipelineItems.length}
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
        title="Created By"
        dataIndex="username"
        key="username"
        render={(_, record: any) => (
          <span >
            {record?.account?.firstName} {record?.account?.lastName}
          </span>
        )}
        filters={arrayFilter}
        // defaultFilteredValue={[
        //   `${public_user_info.firstName} ${public_user_info.lastName}`,
        // ]}
        filterSearch={true}
        onFilter={(value, record) => {
          let fullName = `${record.account?.firstName} ${record.account?.lastName}`;
          return fullName.indexOf(value as string) === 0;
        }}
      />
    </Table>
  )
}
