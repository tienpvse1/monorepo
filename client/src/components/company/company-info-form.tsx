import { Col, Form, Input, Select } from 'antd';
import { isRequired, isEmail, textLength, isPhoneNumber, isNotWhiteSpace } from '@constance/rules-of-input-antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
const { Option } = Select;

export const CompanyInfoForm = () => {
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
      </Col>
      <Col span={12}>
        <Form.Item
          name="mobile"
          label="Phone Number"
          rules={[isPhoneNumber]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
        >
          <Select>
            <Option value='Individual' key='Individual' >
              <UserOutlined /> Individual
            </Option>
            <Option value='Company' key='Company' >
              <HomeOutlined /> Company
            </Option>
          </Select>
        </Form.Item>

      </Col>
    </>
  )
}
