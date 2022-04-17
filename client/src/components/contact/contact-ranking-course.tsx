import { IContact } from "@modules/contact/entity/contact.entity";
import { useQueryAllContacts } from "@modules/contact/query/contact.get";
import { removeDuplicate } from "@util/array";
import { Table } from "antd"
import Column from "antd/lib/table/Column"
import { useEffect, useState } from "react";

export const ContactRankingCourse = () => {
  const { data, isLoading } = useQueryAllContacts();
  // const [dataMap, setDataMap] = useState<IContact[]>();

  console.log("dataC:", data);
  

  // const handleCourse = (record: IContact) =>
  //   record?.contacts?.map((value) => {
  //     return value.pipelineItems.map((item) => {
  //       return item.opportunityRevenue.courseId;
  //     })
  //   })

  // const handleRank = (course: number) => {
  //   if (course >= 3) {
  //     return <Tag color={'gold'}>Gold</Tag>
  //   }
  //   if (course >= 2) {
  //     return <Tag color={'default'}>Silver</Tag>
  //   } else {
  //     return <Tag color={'volcano'}>Bronze</Tag>
  //   }
  // }

  // useEffect(() => {
  //   const dataMap = data?.map((value) => (
  //     {
  //       ...value,
  //       course: removeDuplicate(handleCourse(value), 0).filter(e => e.length)
  //     }
  //   ))
  //     .sort((a, b) => b.course.length - a.course.length)
  //     .map((newValue, index) => ({ ...newValue, index: ++index }))

  //   setDataMap(dataMap);
  // }, [data])

  return (
    <Table
      style={{ paddingTop: '15px' }}
      // loading={isLoading}
      // dataSource={dataMap}
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
            {record.course.length}
          </span>
        )}
      />
      <Column
        title="Rank"
        dataIndex="rank"
        key="rank"
        width={100}
        // render={(_, record: any) => (
        //   handleRank(record.course.length)
        // )}
      />

      <Column
        title="Created By"
        dataIndex="createdAt"
        key="createdAt"
        // render={(_, record: any) => (
        //   <span >
        //     {moment(record.createdAt).format(CRUD_AT)}
        //   </span>
        // )}
      />
    </Table>
  )
}
