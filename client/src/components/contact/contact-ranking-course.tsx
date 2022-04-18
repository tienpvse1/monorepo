import { PUBLIC_USER_INFO } from "@constance/cookie";
import { IContact } from "@modules/contact/entity/contact.entity";
import { useQueryAllContacts } from "@modules/contact/query/contact.get";
import { removeDuplicate } from "@util/array";
import { Table, Tag } from "antd"
import Column from "antd/lib/table/Column"
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";

export const ContactRankingCourse = () => {
  const { data } = useQueryAllContacts();
  const [dataMap, setDataMap] = useState<IContact[]>();
  const [loading, setLoading] = useState(true);

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
  //-------------------------------------

  const handleCourseQuantity = (record: any) =>
    record.reduce((acc: number, course: any) => {
      return acc + course.quantity;
    }, 0)

  const handleCourse = (record: IContact) => {
    let array: any[];
    array = record.pipelineItems.map((item) => {
      if (item.pipelineColumn.isWon)
        return {
          courseId: item.opportunityRevenue.courseId,
          quantity: item.opportunityRevenue.quantity,
          createdAt: item.createdAt
        }
      else {
        return {};
      }
    })

    let newArray = [].concat.apply([], array).filter(value => Object.keys(value).length !== 0);
    return {
      courseDetail: newArray,
      totalQty: handleCourseQuantity(newArray)
    };
  }

  const handleRank = (course: number) => {
    if (course >= 3) {
      return <Tag color={'gold'}>Gold</Tag>
    }
    if (course >= 2) {
      return <Tag color={'default'}>Silver</Tag>
    } else {
      return <Tag color={'volcano'}>Bronze</Tag>
    }
  }

  useEffect(() => {
    const dataMap = data?.map((value) => (
      {
        ...value,
        courses: handleCourse(value)
      }
    ))
      .sort((a, b) => b.courses.totalQty - a.courses.totalQty)
      .map((newValue, index) => ({ ...newValue, index: ++index }))

    setDataMap(dataMap);
    setLoading(false);
  }, [data])

  return (
    <Table
      style={{ paddingTop: '15px' }}
      loading={loading}
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
      />

      <Column
        title="Email"
        dataIndex="email"
        key="email"
      />

      <Column
        title="Purchased Course"
        dataIndex="course"
        key="course"
        align='center'
        width={150}
        render={(_, record: any) => (
          <span>
            {record.courses.totalQty}
          </span>
        )}
      />
      <Column
        title="Rank"
        dataIndex="rank"
        key="rank"
        width={100}
        render={(_, record: any) => (
          handleRank(record.courses.totalQty)
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
        filterSearch={true}
        onFilter={(value, record) => {
          let fullName = `${record.account?.firstName} ${record.account?.lastName}`;
          return fullName.indexOf(value as string) === 0;
        }}
      />
    </Table>
  )
}
