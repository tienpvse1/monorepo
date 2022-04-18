import { ICompany } from '@modules/company/entity/company.entity';
import { useCompanies } from '@modules/company/query/company.get';
import { Table, Tag } from 'antd'
import Column from 'antd/lib/table/Column'
import { useEffect, useState } from 'react';
import moment from 'moment';
import { dateFormat } from "@constance/date-format";
const { CRUD_AT } = dateFormat;

export const CompanyRankingCourse = () => {
  const { data } = useCompanies();
  const [dataMap, setDataMap] = useState<ICompany[]>();
  const [loading, setLoading] = useState(true);
  data.map((value) =>
    value.contacts.map((contact) =>
      contact.pipelineItems = contact.pipelineItems.filter((item) => item.opportunityRevenue !== null)))

  console.log("dataCompany:", data);
  

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
            courseId: item.opportunityRevenue?.courseId,
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
