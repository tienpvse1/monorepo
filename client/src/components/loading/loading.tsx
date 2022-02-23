import { FC } from 'react';
import LoadingComponent from 'react-loading';

interface LoadingProps {
  coverHeight?: string | number;
  coverWidth?: string | number;
  loadingHeight?: number | string;
  loadingWidth?: number | string;
}

export const Loading: FC<LoadingProps> = ({
  coverHeight = '100vh',
  coverWidth = '100vw',
  loadingHeight = 75,
  loadingWidth = 75,
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
      <LoadingComponent
        type='spin'
        color='red'
        height={loadingHeight}
        width={loadingWidth}
      />
    </div>
  );
};
