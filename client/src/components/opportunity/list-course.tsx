import { envVars } from '@env/var.env';
import {
  CourseData,
  course_Detail,
} from '@modules/product/entity/product.entity';
import { Descriptions, PageHeader, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import moment from 'moment';
import { dateFormat } from '@constance/date-format';
const { DEFAULT } = dateFormat;
import numberSeparator from 'number-separator';
// import { useRandomCourse } from '@modules/product/query/products.get';

interface ListCourseProps {
  courseId?: string;
  quantity?: number;
  course: CourseData;
}

export const LIST_SUBJECT_OF_COURSE = 'list-subject-of-course';

export const ListCourse: React.FC<ListCourseProps> = ({
  courseId,
  quantity,
  course,
}) => {
  // const { data: randomCourse } = useRandomCourse();
  const handleSubString = (string: string) => {
    let array = string.split('-');
    return (
      <>
        {array[0]}
        <br />
        {array[1]}
      </>
    );
  };

  return (
    <>
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
                marginLeft: '10px',
                height: '100%',
              }}
            >
              {course.name.length >= 50
                ? handleSubString(course.name)
                : course.name}
              <br />
              <Tag color={'green'}>
                Is Active: {course.isActive ? 'True' : 'False'}
              </Tag>
              <Tag color={'error'}>
                Unit Price: {numberSeparator(course.price, '.')}đ
              </Tag>
              {quantity && <Tag color={'geekblue'}>Quantity Orders: {quantity}</Tag>} 
              <br />
              <Tag color={'cyan'}>
                Certificate Exp: {moment(course.certificateExp).format(DEFAULT)}
              </Tag>
            </span>
          </div>
        }
      >
        <Descriptions size='small' column={3}>
          <Descriptions.Item label='Start Date'>
            {moment(course.startDate).format(DEFAULT)}
          </Descriptions.Item>
          <Descriptions.Item label='End Date'>
            {moment(course.endDate).format(DEFAULT)}
          </Descriptions.Item>
          <Descriptions.Item label='Number Of Trainee'>
            {course.numberOfTrainee || course.number_of_trainee || 10}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Table
        dataSource={course.course_Detail || course.course_detail}
        tableLayout='fixed'
        title={() => (
          <span
            style={{
              fontSize: '14px',
              color: 'rgba(0,0,0,0.7)',
              fontWeight: '700',
              marginLeft: '10px',
            }}
          >
            Subject:
          </span>
        )}
        pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
        size={'small'}
        rowKey={(record) => record.id}
        // expandable={{
        //   expandedRowRender: () => (
        //     <p style={{ marginLeft: 100, marginTop: 10 }}>
        //       Suggested course: {randomCourse.name}
        //     </p>
        //   ),
        // }}
      >
        <Column title='No.' width={50} render={(_, __, index) => ++index} />
        <Column
          title='Name'
          dataIndex='name'
          width={270}
          key='name'
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
          title='Is Active'
          dataIndex='isActive'
          key='isActive'
          render={(_, record: course_Detail) => (
            <span>{record.subjectDetail.isActive ? 'True' : 'False'}</span>
          )}
        />
      </Table>
    </>
  );
};
