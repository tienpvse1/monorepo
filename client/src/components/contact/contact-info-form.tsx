import { SelectBoxCompany } from '@components/company/select-box-company'
import { isEmail, isPhoneNumber, isRequired } from '@constance/rules-of-input-antd'
import { Col, DatePicker, Form, Input } from 'antd'

export const ContactInfoForm = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="name"
          label="Name"
          required
          rules={[isRequired('Name is required')]}>
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
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
        >
          <Input.TextArea showCount maxLength={250} rows={3} />
        </Form.Item>

      </Col>
      <Col span={12}>
        <Form.Item
          name="phone"
          label="Phone"
          required
          rules={[isRequired('Phone is required'), isPhoneNumber]}
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
