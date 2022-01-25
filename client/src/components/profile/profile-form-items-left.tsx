import { Form, Input } from 'antd';

export const ProfileFormItemsLeft = () => {
  return (
    <>
      <Form.Item
        name='fullName'
        rules={[
          {
            len: 6,
            message: 'Name must be at least 6 characters'
          },
          {
            required: true,
            message: 'Please enter your full name!'
          }
        ]}
      >
        <Input placeholder='Full name' />
      </Form.Item>
      {/* <Form.Item name='residence' rules={[{ type: 'array' }]}>
        <SelectBoxResidence />
      </Form.Item> */}
      <Form.Item
        name='email'
        rules={[
          {
            type: 'email',
            message: 'Wrong format email (Ex: abc@gmail.com)',
          },
          {
            required: true,
            message: 'Please input E-mail!',
          },
        ]}
      >
        <Input placeholder='Email' />
      </Form.Item>
    </>
  );
};
