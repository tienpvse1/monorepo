import { FC } from 'react';
import LoadingComponent from 'react-loading';

export const Loading: FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoadingComponent type='spin' color='red' height={75} width={75} />
    </div>
  );
};
