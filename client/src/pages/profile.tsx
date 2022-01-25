import { ProfileAvatar } from '@components/profile/profile-avatar';
import { ProfileFormItemsLeft } from '@components/profile/profile-form-items-left';
import { ProfileFormItemsRight } from '@components/profile/profile-form-items-right';
import { Button, Col, Divider, Form, Row } from 'antd';

export const ProfilePage = () => {
  return (
    <div className='profile-container'>
      <div className='header-profile'>
        <h3>Your Profile Picture</h3>
      </div>
      <Form
        name='register'
        style={{ padding: '0 20px' }}
        initialValues={{
          prefix: '86',
        }}
      >
        <ProfileAvatar />
        <Divider />
        <h3>Your Profile Information</h3>
        <Row gutter={[32, 8]}>
          <Col span={12}>
            <ProfileFormItemsLeft />
          </Col>
          <Col span={12}>
            <ProfileFormItemsRight />
          </Col>
          <Col style={{ textAlign: 'center' }} span={24}>
            <Form.Item>
              <Button
                shape='round'
                type='primary'
                htmlType='submit'
                className='signup-form-button'
              >
                Update profile
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
