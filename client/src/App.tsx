import { Loading } from '@components/loading/loading';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRoutes } from 'react-router-dom';
import './constance/color';
import { route } from './routes/route-map';
import './stylesheets/App.scss';
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
