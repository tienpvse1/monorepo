import { Loading } from '@components/loading/loading';
import { Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRoutes } from 'react-router-dom';
import './constance/color';
import { route } from './routes/route-map';
import './stylesheets/App.scss';
import { io } from 'socket.io-client';
import { envVars } from '@env/var.env';
export const client = new QueryClient();
const socket = io(`${envVars.VITE_BE_DOMAIN}/pipeline`);
function App() {
  const elements = useRoutes(route);

  useEffect(() => {
    socket.on('pipeline-updated', (data) => {
      console.log(data);
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
