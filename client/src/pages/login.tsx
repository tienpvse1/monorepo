import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/login/login-form';
import GoogleButton from 'react-google-button';
import { controllers } from '../constance/controllers';
import { envVars } from '../env/var.env';
import { LottieBackGround } from '../components/background';
import { motion } from 'framer-motion';
import lottieFile from '../animation/background-login.json';

export const LoginPage = () => {
  const { AUTH } = controllers;
  const handleGoogleClick = () => {
    window.location.href = `${envVars.VITE_BE_BASE_URL}${AUTH}/google`;
  };

  return (
    <div className='wrapper-background'>
      <LottieBackGround data={lottieFile} />
      <motion.div
        initial={{ y: '-100vw' }}
        animate={{ y: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 45 }}
        className='wrapper-login-form'
      >
        <div className='header-form'>
          <h1>Đăng Nhập</h1>
          <span>
            Không có tài khoản?
            <Link to='/signup'> Đăng Ký</Link>
          </span>
        </div>
        <div className='content-login-form'>
          <LoginForm />
        </div>
        <Divider>HOẶC</Divider>
        <div className='footer-login-from'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <GoogleButton onClick={handleGoogleClick} />
          </div>
        </div>
        <a href=''>Chính sách bảo mật</a>
      </motion.div>
    </div>
  );
};
