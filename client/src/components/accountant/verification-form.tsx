import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Upload } from "antd"
import { Form, Input } from "antd";
import { isRequired } from "@constance/rules-of-input-antd";

export const VerificationForm = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <div
            style={{
              padding: '10px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: '500',
                paddingBottom: '15px'
              }}
            >
              Upload image (if available):
            </div>
            <Upload
              onChange={(data) => console.log(data)}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
            >
              <Button
                type="dashed"
                icon={<UploadOutlined />}
                style={{ height: '100px', width: '415px', fontSize: '16px' }}
              >
                Click to Upload
              </Button>

            </Upload>
          </div>
        </Col>
        <Col style={{ padding: '20px' }} span={12}>
          <Form.Item
            name="billId"
            label="Bill ID"
            required
            rules={[isRequired('Tax Id is required')]}
          >
            <Input maxLength={14} />
          </Form.Item>
          <Form.Item
            name="reason"
            label="Reason"
          >
            <Input.TextArea
              showCount
              maxLength={150}
              placeholder="Write reason..."
              rows={4}
            />
          </Form.Item>
          {/* hidden input */}
          <Form.Item name="oldStageId" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item name="newStageId" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item name="draggableId" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
