import { Loading } from '@components/loading/loading';
import { envVars } from '@env/var.env';
import { useSocket } from '@hooks/socket';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRoutes } from 'react-router-dom';
import { io } from 'socket.io-client';
import './constance/color';
import { route } from './pages/route-map';
import './stylesheets/App.scss';
export const client = new QueryClient();
const socket = io(`${envVars.VITE_BE_DOMAIN}/webhook`);
function App() {
  const elements = useRoutes(route);
  // const navigate = useNavigate();

  // const idle = useIdle(10000 * 60 * 30, { initialState: false });

  // useEffect(() => {
  //   if (idle) {
  //     instance.post('auth/logout');
  //     navigate('/login');
  //   }
  // }, [idle]);

  useSocket({
    event: 'webhook-sent-event',
    onReceive: (data) => console.log(data),
    socket,
  });

  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={<Loading />}>
        <div className='App'>{elements}</div>
      </Suspense>
    </QueryClientProvider>
  );
}
export default App;
