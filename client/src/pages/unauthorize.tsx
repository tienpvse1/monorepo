import { Button, Result } from 'antd';

export const UnauthorizePage = () => {
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      extra={
        <Button type='primary' shape='round'>
          <a href='/'>Back To Home</a>
        </Button>
      }
    />
  );
};
