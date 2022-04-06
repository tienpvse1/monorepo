import { isNotWhiteSpace } from '@constance/rules-of-input-antd'
import { Col, Form, Input } from 'antd'

export const AddressInfoForm = () => {

  return (
    <>
      <Col span={24}>
        <Form.Item
          name='address'
          label="Address"
          rules={[isNotWhiteSpace]}
        >
          <Input.TextArea showCount maxLength={250} rows={3} />
        </Form.Item>
      </Col>
    </>
  )
}
