import { PUBLIC_USER_INFO } from '@constance/cookie';
import { setCookie } from '@cookies';
import { savePermissions } from '@db/permission.db';
import { Role } from '@interfaces/type-roles';
import { IAuthDto } from '@modules/auth/dto/auth.dto';
import { authenticateUser } from '@modules/auth/mutation/auth.post';
import { useCourseServiceAuth } from '@modules/auth/mutation/course-service.post';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import Modal from './modal';
import { useState } from 'react';
export const COURSE_SERVICE_TOKEN = 'course-service-token';
export const LoginForm = () => {
  const { mutate: authenticateCourseSystem } = useCourseServiceAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mutate, error, reset } = useMutation(authenticateUser, {
    onSuccess: (data) => {
      savePermissions(data.publicData.role.permissions);
      authenticateCourseSystem(
        {
          username: 'ad',
          password: 'password123@',
        },
        {
          onSettled: (authData) => {
            const publicData = JSON.stringify(data.publicData);
            setCookie(COURSE_SERVICE_TOKEN, authData.access_token, 24);
            setCookie(PUBLIC_USER_INFO, publicData || '', 24 * 7);

            if (data.publicData.role.name == `${Role.ADMIN}`) {
              navigate('/administration', { replace: true });
            }
            if (data.publicData.role.name == `${Role.SALE_MANAGER}`) {
              navigate('/sale-manager', { replace: true });
            }
            if (data.publicData.role.name == `${Role.ACCOUNTANT}`) {
              navigate('/accountant', { replace: true });
            }
            if (data.publicData.role.name == Role.SALE) {
              navigate('/', { replace: true });
            }
          },
          onSuccess: () => {
            setLoading(false);
          }
        }
      );
    },
  });
  const handleLogin = async (authDto: IAuthDto) => {
    mutate(authDto);
    setLoading(true);
  };

  if (loading && !error) {
    return <Spin
      indicator={<LoadingOutlined style={{ fontSize: 130 }} spin />}
      style={{ paddingTop: '30px' }}
    />
  }

  return (
    <>
      {error && <Modal setLoading={setLoading} reset={reset} />}
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={(value: IAuthDto) => handleLogin(value)}
      >
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input placeholder='Email' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input type='password' placeholder='Password' />
        </Form.Item>
        <Form.Item style={{ marginTop: '-15px' }}>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox className='checkbox-login-form-forgot'>
              Remember me
            </Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href=''>
            Forgot Password?
          </a>
        </Form.Item>

        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
      </Form>
    </>
  );
};
