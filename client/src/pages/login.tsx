import { LoginForm } from '../components/login/login-form';
import { LottieFile } from '../components/background';
import { motion } from 'framer-motion';
import lottieBackgroundLogin from '../animation/background-login.json';
import lottieIconPlane from '../animation/plane.json';

export const LoginPage = () => {
  return (
    <div className='wrapper-background'>
      <LottieFile
        classNameWrapper='lottie-bg'
        data={lottieBackgroundLogin}
        height={550}
        width={750}
      />
      <motion.div
        initial={{ y: '-100vw' }}
        animate={{ y: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 45 }}
        className='wrapper-login-form'
      >
        <div className='icon-login-form'>
          <LottieFile
            style={{ borderRadius: '45px' }}
            data={lottieIconPlane}
            height={90}
            width={88}
          />
        </div>
        <div className='logo-login-from'>
          <img
            style={{ userSelect: 'none' }}
            src='/vjaa-logo.svg'
            width={'70%'}
            height={'70%'}
          />
        </div>
        <div className='content-login-form'>
          <LoginForm />
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
