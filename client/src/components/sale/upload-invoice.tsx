import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Upload } from "antd"
import { RcFile } from "antd/lib/upload";
import { useState } from "react";

export const UploadInvoice = () => {
  const [file, setFile] = useState<RcFile[]>([]);

  return (
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
          beforeUpload={(file) => setFile([file])}
          onRemove={() => setFile([])}
          listType="picture"
          maxCount={1}
          fileList={file}
          customRequest={() => {}}
        >
          <Button
            type="dashed"
            icon={<UploadOutlined />}
            style={{ height: '100px', width: '415px', fontSize: '16px' }}
          >
            Select File
          </Button>

        </Upload>
      </div>
    </Col>
  )
}
