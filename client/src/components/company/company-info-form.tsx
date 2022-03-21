import { Col, Form, Input, Select } from 'antd';
import { isRequired, isEmail } from '@constance/rules-of-input-antd';
export const CompanyInfoForm = () => {
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
          name="companyOwner"
          label="Company Owner"
        >
          <Select>

          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="mobile"
          label="Telephone"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
        >
          <Select>

          </Select>
        </Form.Item>
       
      </Col>
    </>
  )
}
