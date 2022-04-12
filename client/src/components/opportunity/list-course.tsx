import { envVars } from "@env/var.env";
import { course_Detail } from "@modules/product/entity/product.entity";
import { getCoursesById } from "@modules/product/query/products.get";
import { Descriptions, PageHeader, Spin, Table, Tag } from "antd";
import Column from "antd/lib/table/Column";
import moment from "moment";
import { useQuery } from "react-query";
import { dateFormat } from "@constance/date-format";
const { DEFAULT } = dateFormat;

interface ListCourseProps {
  courseId: string;
  quantity: number;
}

export const LIST_SUBJECT_OF_COURSE = 'list-subject-of-course';

export const ListCourse: React.FC<ListCourseProps> = ({ courseId, quantity }) => {
  const { data, isLoading } = useQuery(LIST_SUBJECT_OF_COURSE, () => getCoursesById(courseId))

  return (
    <Spin spinning={isLoading}>
      <PageHeader
        className='site-page-header'
        style={{ padding: '10px' }}
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={`${envVars.VITE_BE_DOMAIN}/files/box.png`}
              width={46}
              height={46}
            />
            <span
              style={{
                fontSize: '20px',
                color: 'rgba(0,0,0,0.7)',
                fontWeight: '700',
                marginLeft: '10px'
              }}
            >
              {data?.data[0].name} {`(Qty: ${quantity})`} <br />
              <Tag color={'green'}>Is Active: {data?.data[0].isActive ? 'True' : 'False'}</Tag>
            </span>
          </div>
        }
      >
        <Descriptions size='small' column={3}>
          <Descriptions.Item label='Start Date'>
            {moment(data?.data[0].startDate).format(DEFAULT)}
          </Descriptions.Item>
          <Descriptions.Item label='End Date'>
            {moment(data?.data[0].endDate).format(DEFAULT)}
          </Descriptions.Item>
          <Descriptions.Item label='Number Of Trainee'>
            {data?.data[0].numberOfTrainee}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Table
        dataSource={data?.data[0].course_Detail}
        tableLayout='fixed'
        title={() =>
          <span
            style={{
              fontSize: '14px',
              color: 'rgba(0,0,0,0.7)',
              fontWeight: '700',
              marginLeft: '10px'
            }}
          >
            Subject:
          </span>}
        pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
        size={'small'}
        rowKey={(record) => record.id}
      >
        <Column
          title="No."
          width={50}
          render={(_, __, index) => (++index)}
        />
        <Column
          title="Name"
          dataIndex="name"
          width={270}
          key="name"
          render={(_, record: course_Detail) => (
            <span>{record.subjectDetail.name}</span>
          )}
        />

        <Column
          title='Code'
          dataIndex='code'
          key='code'
          render={(_, record: course_Detail) => (
            <span>{record.subjectDetail.code}</span>
          )}
        />

        <Column
          title="Is Active"
          dataIndex="isActive"
          key="isActive"
          render={(_, record: course_Detail) => (
            <span>{record.subjectDetail.isActive ? 'True' : 'False'}</span>
          )}
        />

      </Table>
    </Spin>
  )
}
