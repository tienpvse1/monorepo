import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, message, Row, Upload } from "antd";
const props = {
  beforeUpload: (file: { type: string; name: any; }) => {
    const isJPG = file.type === "image/jpeg"
    message.info(`${file.type}`);
    if (!isJPG) {
      message.error(`${file.name} is not a jpeg file`);
    }
    return isJPG || Upload.LIST_IGNORE;
  },
};
export const ProfileAvatar = () => {
  return <>
    <Row style={{ alignItems: 'center' }}>
      <Col xs={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 2 }} style={{ margin: '0 15px' }}>
        <Avatar
          style={{ height: '70px', width: '70px' }}
          src="https://joeschmoe.io/api/v1/random" />
      </Col>
      <Col sm={{ span: 9 }} md={{ span: 6 }} lg={{ span: 7 }} xl={{ span: 4 }} >
        <Upload {...props}>
          <Button type="primary">Upload New Picture</Button>
        </Upload>
      </Col>
      <Col xs={{ span: 4 }} md={{ span: 3 }} lg={{ span: 5 }} xl={{ span: 4 }} style={{ marginLeft: '10px' }}>
        <Upload>
          <Button icon={<DeleteOutlined />} danger>Remove Picture</Button>
        </Upload>
      </Col>
    </Row>
  </>;
};
