import { isQuantity } from '@constance/rules-of-input-antd';
import { useDebouncedValue } from '@mantine/hooks';
import { CourseData } from '@modules/product/entity/product.entity';
import { getCourses, getMyCoursesById } from '@modules/product/query/products.get';
import { Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
const { Option } = Select;
import numberSeparator from "number-separator";

interface SelectBoxCourseProps {
  courseId?: string;
  quantityOrder?: number;
  styleFormItem?: React.CSSProperties;
  form: FormInstance;
}

export const SelectBoxCourse: React.FC<SelectBoxCourseProps> = ({
  courseId,
  quantityOrder,
  styleFormItem,
  form
}) => {

  const [courses, setCourses] = useState<CourseData[]>();
  const [text, setText] = useState<string>('');
  const [revenue, setRevenue] = useState<number>(0);
  const ref = useRef<number>(0);
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
          setRevenue(value.price * quantityOrder);
          ref.current = value.price;
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
                expectedRevenue: value.price,
                quantity: 1
              })
              setRevenue(value.price);
              ref.current = value.price;
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

      <Form.Item
        name='discountCode'
        label='Discount'
      >
        <Select>

        </Select>
      </Form.Item>

      <Input.Group compact>
        <Form.Item
          name="expectedRevenue"
          style={{ display: 'none' }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Expected Revenue"
          style={{ width: 'calc(70% - 10px)', marginRight: '10px' }}
        >
          <Input
            className='my-input'
            suffix={"vnd"}
            value={numberSeparator(revenue, '.')}
            style={{ height: '40px', borderRadius: '5px' }}
          />
        </Form.Item>

        <Form.Item
          name='quantity'
          label='Quantity'
          rules={[isQuantity]}
          initialValue={1}
          style={{ width: '30%' }}
        >
          <InputNumber
            onChange={(value: number) => setRevenue(ref.current * value)}
            min={1}
            style={{ width: '100%' }}
            className='my-input-number'
          />
        </Form.Item>
      </Input.Group>
    </>
  )
}
