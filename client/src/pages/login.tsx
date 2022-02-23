import { Loading } from '@components/loading/loading';
import { envVars } from '@env/var.env';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { LottieFile } from '../components/background';
import { LoginForm } from '../components/login/login-form';

export const LoginPage = () => {
  return (
    <div className='wrapper-background'>
      <Suspense fallback={<Loading />}>
        <LottieFile
          classNameWrapper='lottie-bg'
          dataURL={`${envVars.VITE_BE_DOMAIN}/files/background-login.json`}
          height={550}
          width={750}
        />
      </Suspense>
      <motion.div
        initial={{ y: '-100vw' }}
        animate={{ y: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 45 }}
        className='wrapper-login-form'
      >
        <div className='icon-login-form'>
          <Suspense fallback={<Loading />}>
            <LottieFile
              style={{ borderRadius: '45px' }}
              dataURL={`${envVars.VITE_BE_DOMAIN}/files/plane.json`}
              height={90}
              width={88}
            />
          </Suspense>
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
