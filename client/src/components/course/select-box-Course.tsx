import { isRequired } from '@constance/rules-of-input-antd';
import { useCourses } from '@modules/course/query/course.get';
import { Form, Select } from 'antd';
const { Option } = Select;

export const SelectBoxCourse = () => {
  const { data: course } = useCourses();
  return (
    <>
      {course &&
        <Form.Item
          label='Course Name'
          name='courseId'
          rules={[isRequired('Course name is required')]}
          style={{ width: 'calc(80% - 10px)', marginRight: '10px' }}
        >
          <Select
            showSearch
            placeholder='Select a course'
            optionFilterProp='children'
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {course?.map((course) => (
              <Option key={course.id}>
                {course.name}
              </Option>
            ))}
          </Select>
        </Form.Item>}
    </>
  )
}
