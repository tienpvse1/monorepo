import { Form, Input } from 'antd';
import { SelectBoxDistrict } from './select-box-district';
import { SelectBoxPrefix } from './select-box-prefix-phone';

export const ProfileFormItemsRight = () => {
  return (
    <>
      <Form.Item name='district' rules={[{ type: 'array' }]}>
        <SelectBoxDistrict />
      </Form.Item>

      <Form.Item
        name='phone'
      >
        <div className='input-phone-number'>
          <Input placeholder='Phone number' addonBefore={<SelectBoxPrefix />} />
        </div>
      </Form.Item>
    </>
  );
};
