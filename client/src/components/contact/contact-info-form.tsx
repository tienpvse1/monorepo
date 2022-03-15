import { SelectBoxPrefix } from '@components/signup/select-box-prefix-phone'
import { isEmail, isPhoneNumber, isRequired } from '@constance/rules-of-input-antd'
import { Col, DatePicker, Form, Input, Select } from 'antd'

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
          name="company"
          label="Company"
        >
          <Select>

          </Select>
        </Form.Item>
        <Form.Item
          name="birth"
          label="Birth"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

      </Col>
      <Col span={12}>
        <Form.Item
          name="phone"
          label="Phone"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mobile"
          label="Mobile"
          required
          rules={[isRequired('Mobile is required'), isPhoneNumber]}
        >
          <Input addonBefore={<SelectBoxPrefix />} />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
        >
          <Select>

          </Select>
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
        >
          <Input />
        </Form.Item>
      </Col>
    </>
  )
}
