import { PUBLIC_USER_INFO } from '@constance/cookie';
import { setCookie } from '@cookies';
import { savePermissions } from '@db/permission.db';
import { Role } from '@interfaces/type-roles';
import { IAuthDto } from '@modules/auth/dto/auth.dto';
import { authenticateUser } from '@modules/auth/mutation/auth.post';
import { Button, Checkbox, Form, Input } from 'antd';
import { useMutation } from 'react-query';
import { Navigate } from 'react-router-dom';
import Modal from './modal';
export const LoginForm = () => {
  const { mutate, error, data, reset, isSuccess } = useMutation(
    authenticateUser,
    {
      onSuccess: (data) => {
        savePermissions(data.publicData.permissions);
      },
    }
  );
  const handleLogin = async (authDto: IAuthDto) => {
    mutate(authDto);
  };
  if (isSuccess && data) {
    const publicData = JSON.stringify(data.publicData);
    setCookie(PUBLIC_USER_INFO, publicData || '', 0.5);

    if (data.publicData.role == `${Role.ADMIN}1`) {
      return <Navigate to={'/administration'} replace />;
    }
    return <Navigate to={'/'} replace />;
  }

  return (
    <>
      {error && <Modal reset={reset} />}
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
