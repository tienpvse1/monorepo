import { isNotWhiteSpace } from '@constance/rules-of-input-antd'
import { Col, Form, Input } from 'antd'

export const OpportunityAdditionalForm = () => {
  return (
    <>
      <Col span={24}>
        <Form.Item
          name="description"
          label="Description"
          rules={[isNotWhiteSpace]}
        >
          <Input.TextArea showCount maxLength={150} placeholder='Description...' style={{ height: '80px' }}/>
        </Form.Item>
      </Col>
    </>
  )
}
