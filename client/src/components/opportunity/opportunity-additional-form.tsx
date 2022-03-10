import { Col, Form, Input } from 'antd'

export const OpportunityAdditionalForm = () => {
  return (
    <>
      <Col span={24}>
        <Form.Item
          name="internalDescription"
          label="Description"
        >
          <Input.TextArea />
        </Form.Item>
      </Col>
    </>
  )
}
