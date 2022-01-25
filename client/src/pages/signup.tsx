import { Link } from 'react-router-dom';
import { LottieBackGround } from '../components/background';
import { SignUpForm } from '../components/signup/signup-form';
import { motion } from 'framer-motion'
import lottieFile from '../animation/background-login.json';

export const SignUpPage = () => {
  return (
    <div className='wrapper-background'>
      <LottieBackGround data={lottieFile} />
      <motion.div
        initial={{ y: '-100vw' }}
        animate={{ y: -5 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 37 }}
        className='wrapper-signup-form'
      >
        <div className='header-form'>
          <h1>Đăng Ký</h1>
          <span>
            Đã có tài khoản?
            <Link to='/login'> Đăng Nhập</Link>
          </span>
        </div>

        <div className='content-signup-form'>
          <div className='information-form'>
            <h2>Thông tin</h2>
            <SignUpForm />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
