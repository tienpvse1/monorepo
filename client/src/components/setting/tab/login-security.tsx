import { Button, Col, Form, Input, Row } from "antd";

export const TabLoginAndSecurity = () => {
  return (
    <>
      <Row gutter={[32, 8]}>
        <Col span={12} offset={6}>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please enter current password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder='Current password' />
          </Form.Item>
        </Col>
        <Col span={12} offset={6}>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please enter password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder='The new password' />
          </Form.Item>
        </Col>
        <Col span={12} offset={6}>
          <Form.Item
            name='confirm'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please enter password try again!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Password must be match!')
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder='Enter password again' />
          </Form.Item>
        </Col>

        <Col style={{ textAlign: 'center' }} span={24}>
          <Form.Item>
            <Button
              shape='round'
              type='primary'
              htmlType='submit'
              className='signup-form-button'
            >
              Update password
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
