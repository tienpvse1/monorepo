import { instance } from '@axios';
import { Loading } from '@components/loading/loading';
import { envVars } from '@env/var.env';
import { useIdle } from '@mantine/hooks';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { Button, notification } from 'antd';
import { Suspense, useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { io } from 'socket.io-client';
import './constance/color';
import { useSocket } from '@hooks/socket';
import { route } from './routes/route-map';
import './stylesheets/App.scss';

const socket = io(`${envVars.VITE_BE_DOMAIN}/pipeline`);
function App() {
  const elements = useRoutes(route);
  const navigate = useNavigate();

  const idle = useIdle(10000 * 60 * 30, { initialState: false });
  useEffect(() => {
    if (idle) {
      instance.post('auth/logout');
      navigate('/login');
    }
  }, [idle]);

  const openNotification = (data: IPipeline) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type='primary'
        size='small'
        onClick={() => notification.close(key)}
      >
        Confirm
      </Button>
    );
    notification.open({
      message: 'Pipeline updated',
      description: `${data.name} has been updated`,
      btn,
      key,
      onClose: close,
    });
  };

  const { data } = useSocket<IPipeline, any>({
    event: 'pipeline-updated',
    socket,
    onReceive: openNotification,
  });

  return (
    <Suspense fallback={<Loading />}>
      <div className='App'>{elements}</div>
    </Suspense>
  );
}
export default App;
