import axios from 'axios';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { useQuery } from 'react-query';
interface ILottieFile {
  dataURL: any;
  height: string | number;
  width: string | number;
  style?: React.CSSProperties;
  classNameWrapper?: string;
}

export const LottieFile: React.FC<ILottieFile> = ({
  dataURL,
  height,
  width,
  style,
  classNameWrapper,
}) => {
  const getLottie = async () => {
    const { data } = await axios.get(dataURL);
    return data;
  };

  const { data } = useQuery(dataURL, getLottie, { suspense: true });
  return (
    <motion.div
      className={classNameWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <Lottie
        style={style}
        options={{
          loop: true,
          autoplay: true,
          animationData: data,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={height}
        width={width}
      />
    </motion.div>
  );
};
