import { Col, Form, Input } from "antd"


export const CompanyAdditionalForm = () => {
  return (
    <>
      <Col span={24}>
        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea />
        </Form.Item>
      </Col>
    </>
  )
}
