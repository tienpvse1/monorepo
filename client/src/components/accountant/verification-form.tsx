import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Upload } from "antd"
import { Form, Input } from "antd";
import { isRequired, isTaxId } from "@constance/rules-of-input-antd";
const fileList: any = [
  {
    uid: '-1',
    name: 'example1.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'example2.png',
    status: 'error',
  },
];

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
              defaultFileList={[...fileList]}
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
            name="taxId"
            label="Tax ID"
            required
            rules={[isRequired('Tax Id is required') ,isTaxId]}
          >
            <Input maxLength={13}/>
          </Form.Item>
          <Form.Item
            name="feedBack"
            label="Feedback"
          >
            <Input.TextArea
              showCount
              maxLength={150}
              placeholder="Write Feedback..."
              rows={4}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
