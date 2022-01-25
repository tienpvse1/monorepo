import { motion } from 'framer-motion';
import Lottie, { Options } from 'react-lottie';

interface ILottieBackGround {
  data: any;
}

export const LottieBackGround: React.FC<ILottieBackGround> = ({ data }) => {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <motion.div
      
      className='lottie-bg'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <Lottie options={defaultOptions} height={550} width={750} />
    </motion.div>
  );
};
