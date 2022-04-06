import { InboxOutlined } from '@ant-design/icons';
import { envVars } from '@env/var.env';
import { ICreateAccountDto } from '@modules/account/dto/create-account.dto';
import { QUERY_ALL_ACCOUNTS } from '@modules/account/get/account.get';
import { useCreateAccount } from '@modules/account/mutation/account.post';
import { useRoles } from '@modules/role/query/role.get';
import { useTeams } from '@modules/team/query/team.get';
import { compressImage } from '@util/file';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
} from 'antd';
import { useState } from 'react';
import { client } from '../../../App';

interface CreateAccountDrawerProps {
  isVisible: boolean;
  toggle: (value: boolean) => void;
}

const { Option } = Select;
export const CreateAccountDrawer: React.FC<CreateAccountDrawerProps> = ({
  isVisible,
  toggle,
}) => {
  const { data, isLoading } = useTeams();
  const { data: roles, isLoading: isLoadingRoles } = useRoles();
  const [form] = Form.useForm<ICreateAccountDto>();
  const [currentFile, setCurrentFile] = useState(undefined);
  const { mutate } = useCreateAccount();
  const handleSubmit = (value: ICreateAccountDto) => {
    mutate(
      {
        ...value,
        photo: currentFile,
      },
      {
        onSettled: async () => {
          await client.refetchQueries(QUERY_ALL_ACCOUNTS);
          toggle(false);
        },
      }
    );
  };``
  return (
    <Drawer
      title='Create a new account'
      width={720}
      onClose={() => toggle(false)}
      visible={isVisible}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={() => toggle(false)}>Cancel</Button>
          <Button onClick={() => form.submit()} type='primary'>
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        onFinish={(value) => handleSubmit(value)}
        form={form}
        layout='vertical'
        hideRequiredMark
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='firstName'
              label='First name'
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input placeholder='First name' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='lastName'
              label='Last name'
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input style={{ width: '100%' }} placeholder='Last name' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='email'
              label='Email'
              rules={[{ required: true, message: 'Please enter email' }]}
            >
              <Input placeholder='Email' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='password'
              label='Password'
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input.Password
                style={{ width: '100%' }}
                placeholder='Password'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='teamId'
              label='Team'
              rules={[{ required: true, message: 'Please select an Team' }]}
            >
              <Select loading={isLoading} placeholder='Please select an owner'>
                {data?.map((team) => (
                  <Option key={team.id}>{team.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='roleId'
              label='Role'
              rules={[{ required: true, message: 'Please choose the role' }]}
            >
              <Select
                loading={isLoadingRoles}
                placeholder='Please choose the role'
              >
                {roles?.map((role) => (
                  <Option key={role.id}>{role.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='username'
              label='Username'
              rules={[{ required: true, message: 'Please enter username' }]}
            >
              <Input placeholder='Username' />
            </Form.Item>
          </Col>
        </Row>
        <p>Avatar</p>
        <Upload.Dragger
          style={{
            width: '100%',
          }}
          action={`${envVars.VITE_BE_BASE_URL}/file/upload`}
          listType='picture'
          multiple={false}
          maxCount={1}
          name='files'
          method='POST'
          withCredentials
          beforeUpload={(file) => compressImage(file, 0.1)}
          progress={{ strokeWidth: 5, showInfo: false }}
          onChange={(info) => {
            if (info.file.status === 'done') {
              setCurrentFile(
                `${envVars.VITE_BE_DOMAIN}/files/${info.file.response.data[0].filename}`
              );
            }
          }}
        >
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag image to this area to upload
          </p>
        </Upload.Dragger>
      </Form>
    </Drawer>
  );
};
