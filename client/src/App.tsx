import { instance } from '@axios';
import { Loading } from '@components/loading/loading';
import { envVars } from '@env/var.env';
import { useIdle } from '@mantine/hooks';
import { Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useNavigate, useRoutes } from 'react-router-dom';
import './constance/color';
import { route } from './routes/route-map';
import './stylesheets/App.scss';
export const client = new QueryClient();
function App() {
  const elements = useRoutes(route);
  const navigate = useNavigate();
  console.log(envVars.VITE_BE_DOMAIN);

  const idle = useIdle(10000 * 60 * 30, { initialState: false });

  useEffect(() => {
    if (idle) {
      instance.post('auth/logout');
      navigate('/login');
    }
  }, [idle]);

  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={<Loading />}>
        <div className='App'>{elements}</div>
      </Suspense>
    </QueryClientProvider>
  );
}
export default App;
