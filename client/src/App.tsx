import { Loading } from '@components/loading/loading';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRoutes } from 'react-router-dom';
import './constance/color';
import { route } from './pages/route-map';
import './stylesheets/App.scss';
export const client = new QueryClient();
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

  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={<Loading />}>
        <div className='App'>{elements}</div>
      </Suspense>
    </QueryClientProvider>
  );
}
export default App;
