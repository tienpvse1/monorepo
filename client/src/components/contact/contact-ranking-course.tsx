import { PUBLIC_USER_INFO } from "@constance/cookie";
import { IContact } from "@modules/contact/entity/contact.entity";
import { useQueryAllContacts } from "@modules/contact/query/contact.get";
import { removeDuplicate } from "@util/array";
import { Table, Tag } from "antd"
import Column from "antd/lib/table/Column"
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { dateFormat } from "@constance/date-format";
const { CRUD_AT } = dateFormat;

export const ContactRankingCourse = () => {
  const { data } = useQueryAllContacts();
  const [dataMap, setDataMap] = useState<IContact[]>();
  const [loading, setLoading] = useState(true);

  console.log("dataContact:", data);


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
          courseId: item.opportunityRevenue?.course.id,
          courseName: item.opportunityRevenue?.course.name,
          quantity: item.opportunityRevenue?.quantity,
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

    return () => {
      setDataMap([]);
    }
  }, [data])

  const expandedRowRender = (data: any) => {
    const nestedColumns: any = [
      {
        title: 'Course ID',
        key: 'courseId',
        dataIndex: 'courseId',
      },
      {
        title: 'Course Name',
        key: 'courseName',
        dataIndex: 'courseName'
      },
      {
        title: 'Quantity',
        key: 'quantity',
        dataIndex: 'quantity',
        align: 'center'
      },
      {
        title: 'Created Date',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (_, record: any) => (
          <span>{moment(record.createdAt).format(CRUD_AT)}</span>
        )
      }
    ];

    return (
      <Table
        columns={nestedColumns}
        dataSource={data.courses.courseDetail}
        pagination={false}
      />
    );
  };

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
      expandedRowRender={(record) => expandedRowRender(record)}
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

      {/* <Column
        title="Email"
        dataIndex="email"
        key="email"
      /> */}

      <Column
        title="Purchased Course"
        dataIndex="course"
        key="course"
        align='center'
        // width={150}
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
        // width={100}
        render={(_, record: any) => (
          handleRank(record.courses.totalQty)
        )}
      />

      <Column
        title="Created By"
        dataIndex="username"
        key="username"
        // width={120}
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
