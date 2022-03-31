import { useCourses } from '@modules/product/query/products.get';
import { Form, Select } from 'antd';
const { Option } = Select;

export const SelectBoxCourse = () => {
  const { data: courses } = useCourses();

  return (
    <>
      {courses &&
        <Form.Item
          name='courseId'
          label='Course'
          initialValue={courses?.data.length > 0 && courses?.data[0].code}
          style={{ width: 'calc(80% - 10px)', marginRight: '10px' }}
          rules={[{ required: true, message: 'Please choose a course' }]}
        >
          <Select
            showSearch
            placeholder='Select a course'
            filterOption={(input, option) => {
              return option.children
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase());
            }}
          >
            {courses?.data
              .filter((_item, index) => index < 5)
              .map((course) => (
                <Option key={course.code} value={course.code}>
                  {course.name}
                </Option>
              ))}
          </Select>
        </Form.Item>}
    </>
  )
}
