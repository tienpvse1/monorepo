import { Col, Form, Input } from 'antd'

export const AddressInfoForm = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name={['addresses', 'address']}
          label="Address"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={['addresses', 'city']}
          label="City"
        >
          <Input />
        </Form.Item>
        <Input.Group compact>
          <Form.Item
            name="postCode"
            label="Post Code"
            style={{ width: 'calc(70% - 10px)', marginRight: '10px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['addresses', 'country']}
            label="Country"
            style={{ width: '30%' }}
          >
            <Input />
          </Form.Item>
        </Input.Group>
      </Col>
      <Col span={12}>
        <Form.Item
          name="jobPosition"
          label="Job Position"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="website"
          label="Website"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="taxId"
          label="Tax ID"
        >
          <Input />
        </Form.Item>
      </Col>
    </>
  )
}
