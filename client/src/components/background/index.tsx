import { motion } from 'framer-motion';
import Lottie, { Options } from 'react-lottie';

interface ILottieFile {
  data: any;
  height: string | number;
  width: string | number;
  style?: React.CSSProperties;
  classNameWrapper?: string;
}

export const LottieFile: React.FC<ILottieFile> = ({ data, height, width, style, classNameWrapper }) => {
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
      className={classNameWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <Lottie style={style} options={defaultOptions} height={height} width={width} />
    </motion.div>
  );
};
