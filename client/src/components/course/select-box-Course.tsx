import { useDebouncedValue } from '@mantine/hooks';
import { CourseData } from '@modules/product/entity/product.entity';
import { getCourses } from '@modules/product/query/products.get';
import { Form, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getCoursesById } from '@modules/product/query/products.get';

const { Option } = Select;

interface SelectBoxCourseProps {
  courseId?: string;
  styleFormItem?: React.CSSProperties;
}

export const SelectBoxCourse: React.FC<SelectBoxCourseProps> = ({ courseId, styleFormItem }) => {
  const [courses, setCourses] = useState<CourseData[]>();
  const [text, setText] = useState<string>('');
  const [debounced] = useDebouncedValue(text, 400);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      getCourses(debounced, 5).then((value) => setCourses(value.data));
    } else {
      isMounted.current = true;
      if (courseId) {
        getCoursesById(courseId).then((value) => setCourses(value.data));
      } else {
        getCourses('', 5).then((value) => setCourses(value.data));
      }
    }
    return () => {
      setCourses([])
    }
  }, [debounced])

  return (
    <>
      <Form.Item
        name='courseId'
        label='Course'
        initialValue={courses?.length > 0 && courses?.[0].code}
        style={styleFormItem}
        rules={[{ required: true, message: 'Please choose a course' }]}
      >
        <Select
          showSearch
          onSearch={(value) => setText(value)}
          placeholder='Select a course'
          filterOption={(input, option) => {
            return option.children
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase());
          }}
        >
          {courses?.filter((_item, index) => index < 5)
            .map((course) => (
              <Option key={course.code} value={course.code}>
                {course.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
    </>
  )
}
