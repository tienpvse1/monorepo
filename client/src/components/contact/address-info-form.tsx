import { isRequired, isTaxId } from '@constance/rules-of-input-antd'
import { Col, Form, Input } from 'antd'

export const AddressInfoForm = () => {

  return (
    <>
      <Col span={12}>
        <Form.Item
          name={['addresses', 'address']}
          label="Address"
          rules={[isRequired('Address is required')]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={['addresses', 'city']}
          label="City"
          rules={[isRequired('City is required')]}
        >
          <Input />
        </Form.Item>
        <Input.Group compact>
          <Form.Item
            name="postalCode"
            label="Postal Code"
            style={{ width: 'calc(70% - 10px)', marginRight: '10px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['addresses', 'country']}
            label="Country"
            rules={[isRequired('Country is required')]}
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
          rules={[isTaxId]}
        >
          <Input maxLength={14}/>
        </Form.Item>
      </Col>
    </>
  )
}
