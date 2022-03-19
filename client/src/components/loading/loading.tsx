import { Spin } from 'antd';

interface LoadingProps {
  coverHeight?: string | number;
  coverWidth?: string | number;
  loadingHeight?: number | string;
  loadingWidth?: number | string;
  size?: 'large' | 'small' | 'default';
}

export const Loading: React.FC<LoadingProps> = ({
  coverHeight = '100vh',
  coverWidth = '100vw',
  loadingHeight = 75,
  loadingWidth = 75,
  size = 'large',
}) => {
  return (
    <div
      style={{
        height: coverHeight,
        width: coverWidth,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin
        size={size}
        style={{
          height: loadingHeight,
          width: loadingWidth,
        }}
      />
    </div>
  );
};
