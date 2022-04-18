import { ICompany } from '@modules/company/entity/company.entity';
import { useCompaniesWithColumn } from '@modules/company/query/company.get';
import { Table, Tag } from 'antd'
import Column from 'antd/lib/table/Column'
import { useEffect, useState } from 'react';
import moment from 'moment';
import { TypeOfCompany } from '@components/company/type-of-company';
import { dateFormat } from "@constance/date-format";
const { CRUD_AT } = dateFormat;

export const CompanyRankingCourse = () => {
  const { data } = useCompaniesWithColumn();
  const [dataMap, setDataMap] = useState<ICompany[]>();
  const [loading, setLoading] = useState(true);

  const handleCourseQuantity = (record: any) =>
    record.reduce((acc: number, course: any) => {
      return acc + course.quantity;
    }, 0)

  const handleCourse = (record: ICompany) => {
    let array: any[];
    array = record?.contacts?.map((value) => {
      return value.pipelineItems.map((item) => {
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
      title={() => <span style={{ fontSize: '20px' }}>Top Company</span>}
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
        title="Type"
        dataIndex="type"
        key="type"
        width={120}
        render={(text) => (
          <TypeOfCompany type={text} />
        )}
      />
    </Table>
  )
}
