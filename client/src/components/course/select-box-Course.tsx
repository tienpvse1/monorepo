import { useDebouncedValue } from '@mantine/hooks';
import { CourseData } from '@modules/product/entity/product.entity';
import { getCourses, getMyCoursesById } from '@modules/product/query/products.get';
import { Form, FormInstance, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
const { Option } = Select;

interface SelectBoxCourseProps {
  courseId?: string;
  styleFormItem?: React.CSSProperties;
  form: FormInstance;
}

export const SelectBoxCourse: React.FC<SelectBoxCourseProps> = ({
  courseId,
  styleFormItem,
  form
}) => {

  const [courses, setCourses] = useState<CourseData[]>();
  const [text, setText] = useState<string>('');
  const [debounced] = useDebouncedValue(text, 400);
  const isMounted = useRef(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (isMounted.current) {
      getCourses(debounced, 5).then((value) => setCourses(value.data));
    } else {
      isMounted.current = true;
      if (courseId) {
        setWaiting(true);
        getMyCoursesById(courseId).then((value) => {
          setCourses([value]);
          form.setFieldsValue({
            expectedRevenue: value.price
          })
          setWaiting(false);
        });
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
          loading={waiting}
          showSearch
          onSearch={(value) => setText(value)}
          onSelect={(courseId: string) => {
            setWaiting(true);
            getMyCoursesById(courseId).then((value) => {
              form.setFieldsValue({
                expectedRevenue: value.price
              })
              setWaiting(false);
            })
          }}
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
              <Option key={course.id} value={course.id}>
                {course.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
    </>
  )
}
