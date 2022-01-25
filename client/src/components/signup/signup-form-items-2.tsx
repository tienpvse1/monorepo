import { Form, Input } from 'antd';
import { SelectBoxDistrict } from './select-box-district';
import { SelectBoxGender } from './select-box-gender';
import { SelectBoxPrefix } from './select-box-prefix-phone';

export const SignUpFormItems2 = () => {
  return (
    <>
      <Form.Item
        name='gender'
      >
        <SelectBoxGender />
      </Form.Item>
      <Form.Item name='district' rules={[{ type: 'array' }]}>
        <SelectBoxDistrict />
      </Form.Item>

      <Form.Item
        name='phone'
      >
        <div className='input-phone-number'>
          <Input placeholder='Nhập số ĐT' addonBefore={<SelectBoxPrefix />} />
        </div>
      </Form.Item>

      <Form.Item
        name='confirm'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Xin hãy nhập lại mật khẩu!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Mật khẩu nhập không trùng khớp!')
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder='Nhập lại mật khẩu' />
      </Form.Item>
    </>
  );
};
