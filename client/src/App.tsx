import { Loading } from '@components/loading/loading';
import { Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRoutes } from 'react-router-dom';
import './constance/color';
import { route } from './routes/route-map';
import './stylesheets/App.scss';
import { io } from 'socket.io-client';
import { envVars } from '@env/var.env';
import { Button, notification } from 'antd';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
export const client = new QueryClient();
const socket = io(`${envVars.VITE_BE_DOMAIN}/pipeline`);
function App() {
  const elements = useRoutes(route);

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

  useEffect(() => {
    socket.on('pipeline-updated', (data: IPipeline) => {
      openNotification(data);
    });
  }, [socket]);

  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={<Loading />}>
        <div className='App'>{elements}</div>
      </Suspense>
    </QueryClientProvider>
  );
}
export default App;
