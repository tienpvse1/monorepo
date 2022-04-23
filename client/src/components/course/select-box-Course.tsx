import { isQuantity } from '@constance/rules-of-input-antd';
import { useDebouncedValue } from '@mantine/hooks';
import { CourseData } from '@modules/product/entity/product.entity';
import { getCourses, getMyCoursesById } from '@modules/product/query/products.get';
import { Form, FormInstance, Input, InputNumber, Select, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
const { Option } = Select;
import numberSeparator from "number-separator";
import { useQueryDiscount } from '@modules/discount/query/discount.get';
import moment from 'moment';
import { dateFormat } from '@constance/date-format';
const { DEFAULT } = dateFormat;

interface SelectBoxCourseProps {
  courseId?: string;
  quantityOrder?: number;
  expectedRevenue?: number;
  styleFormItem?: React.CSSProperties;
  form: FormInstance;
}

export const SelectBoxCourse: React.FC<SelectBoxCourseProps> = ({
  courseId,
  quantityOrder = 1,
  expectedRevenue = 0,
  styleFormItem,
  form
}) => {
  const { data: discount } = useQueryDiscount();

  const [courses, setCourses] = useState<CourseData[]>();
  const [text, setText] = useState<string>('');
  const [revenue, setRevenue] = useState<number>(0);
  const [waiting, setWaiting] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const ref = useRef<number>(0);
  const coursePrice = useRef<number>(0);
  const isMounted = useRef(false);

  const [debounced] = useDebouncedValue(text, 400);

  useEffect(() => {
    if (isMounted.current) {
      getCourses(debounced, 5).then((value) => setCourses(value.data));
    } else {
      isMounted.current = true;
      if (courseId) {
        setWaiting(true);
        getMyCoursesById(courseId).then((value) => {
          setCourses([value]);
          ref.current = expectedRevenue / quantityOrder;
          coursePrice.current = value.price;
          form.setFieldsValue({ expectedRevenue: ref.current })
          setRevenue(expectedRevenue);
          setWaiting(false);
          setDisabled(false);
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
          onChange={(courseId: string) => {
            setWaiting(true);
            getMyCoursesById(courseId).then((value) => {
              form.setFieldsValue({
                expectedRevenue: value.price,
                quantity: 1
              })
              setRevenue(value.price);
              coursePrice.current = value.price;
              form.resetFields(['discountCode']);
              setDisabled(false);
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
        initialValue={0}
      >
        <Select
          disabled={disabled}
          onChange={(discount: number) => {
            ref.current = coursePrice.current - (coursePrice.current * discount)
            setRevenue(ref.current)
            form.setFieldsValue({ expectedRevenue: ref.current })
          }}
        >
          <Option key='none' value={0}>
            None
          </Option>
          {discount?.map((value) => (
            <Option key={value.id} value={value.discountAmount}>
              <Tag color={'red'}>
                -{value.discountAmount * 100}%
              </Tag>
              <Tag color={'gold'}>
                {`EXP: ${moment(value.expireAt).format(DEFAULT)}`}
              </Tag>
            </Option>
          ))}
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
            onChange={(value: number) => {
              setRevenue(ref.current * value)
            }}
            min={1}
            style={{ width: '100%' }}
            className='my-input-number'
          />
        </Form.Item>
      </Input.Group>
    </>
  )
}
