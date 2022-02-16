import { useRoutes } from 'react-router-dom';
import './stylesheets/App.scss';
import { route } from './routes/route-map';
import { QueryClient, QueryClientProvider } from 'react-query';
import './constance/color';
import { Suspense } from 'react';
import { Loading } from '@components/loading/loading';
export const client = new QueryClient();
function App() {
  const elements = useRoutes(route);
  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={<Loading />}>
        <div className='App'>{elements}</div>
      </Suspense>
    </QueryClientProvider>
  );
}
export default App;
