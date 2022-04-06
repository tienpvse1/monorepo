import { UploadOutlined } from "@ant-design/icons";
import { envVars } from "@env/var.env";
import { compressImage, uploadFiles } from "@util/file";
import { Button, Col, Form, FormInstance, Input, Upload } from "antd"
import { RcFile } from "antd/lib/upload";
import { useState } from "react";

interface UploadInvoiceProps {
  form: FormInstance<any>;
}

export const UploadInvoice: React.FC<UploadInvoiceProps> = ({ form }) => {
  const [file, setFile] = useState<RcFile[]>([]);

  const handleOnChangeUpload = async (file: any) => {

    //Compress Image
    const compressedPhoto = await compressImage(file, 0.1);
    const data = await uploadFiles([compressedPhoto]);
    const imageUrl = `${envVars.VITE_BE_DOMAIN}/files/${data[0].filename}`;
    form.setFieldsValue({ photo: imageUrl })

    setFile([file]);
  }

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
          beforeUpload={(file) => handleOnChangeUpload(file)}
          onRemove={() => setFile([])}
          listType="picture"
          maxCount={1}
          fileList={file}
          customRequest={() => { }}
        >
          <Button
            type="dashed"
            icon={<UploadOutlined />}
            style={{ height: '100px', width: '415px', fontSize: '16px' }}
          >
            Select File
          </Button>

        </Upload>
        {/* Hidden input */}
        <Form.Item name="photo" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
      </div>
    </Col>
  )
}
