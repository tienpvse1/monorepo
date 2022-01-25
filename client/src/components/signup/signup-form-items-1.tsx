import { Checkbox, Form, Input } from 'antd';
import { SelectBoxResidence } from './select-box-residence';

export const SignUpFormItems1 = () => {
  return (
    <>
      <Form.Item
        name='fullname'
      >
        <Input placeholder='Họ và tên' />
      </Form.Item>
      <Form.Item name='residence' rules={[{ type: 'array' }]}>
        <SelectBoxResidence />
      </Form.Item>
      <Form.Item
        name='email'
        rules={[
          {
            type: 'email',
            message: 'Sai định dạng email (vd: abc@gmail.com)',
          },
          {
            required: true,
            message: 'Xin hãy nhập E-mail!',
          },
        ]}
      >
        <Input placeholder='Email' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Xin hãy nhập mật khẩu!',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder='Mật khẩu' />
      </Form.Item>
      <Form.Item
        style={{ marginTop: '-15px' }}
        name='agreement'
        valuePropName='checked'
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Bạn chưa tick đồng ý')),
          },
        ]}
      >
        <Checkbox>
          Tôi đồng ý với <a href=''>Chính sách bảo mật</a>
        </Checkbox>
      </Form.Item>
    </>
  );
};
