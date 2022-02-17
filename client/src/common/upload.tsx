import { InboxOutlined } from '@ant-design/icons';
import { readExcel } from '@util/excel';
import { UploadChangeParam } from 'antd/lib/upload';
import Dragger from 'antd/lib/upload/Dragger';
import React from 'react';
interface UploadProps {}

const Upload: React.FC<UploadProps> = ({}) => {
  const handleChange = async (info: UploadChangeParam<any>) => {
    const data = await readExcel(info.file);
    console.log(data);
  };

  return (
    <Dragger
      name='file'
      beforeUpload={() => false}
      onChange={(info) => handleChange(info)}
      accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
    >
      <p className='ant-upload-drag-icon'>
        <InboxOutlined />
      </p>
      <p className='ant-upload-text'>
        Click or drag file to this area to upload
      </p>
      <p className='ant-upload-hint'>
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Dragger>
  );
};
export default Upload;
