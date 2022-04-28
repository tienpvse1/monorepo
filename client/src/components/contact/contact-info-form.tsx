import { SelectBoxCompany } from '@components/company/select-box-company'
import { isEmail, isPhoneNumber, isRequired, textLength, isNotWhiteSpace } from '@constance/rules-of-input-antd'
import { Col, DatePicker, Form, Input } from 'antd'
import { SelectBoxTags } from './select-box-tags'

export const ContactInfoForm = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="name"
          label="Name"
          required
          rules={
            [
              isRequired('Name is required'),
              textLength(3, 50, 'Name'),
              isNotWhiteSpace
            ]
          }
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          required
          rules={[isRequired('Email is required'), isEmail]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="jobPosition"
          label="Job Position"
          rules={
            [
              textLength(3, 50, 'Job Position'),
              isNotWhiteSpace
            ]
          }
        >
          <Input />
        </Form.Item>

        <SelectBoxTags />

      </Col>
      <Col span={12}>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[isPhoneNumber]}
        >
          <Input />
        </Form.Item>

        <SelectBoxCompany />

        <Form.Item
          name="birth"
          label="Birth"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </>
  )
}
