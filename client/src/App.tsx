import { useRoutes } from 'react-router-dom';
import './stylesheets/App.scss';
import { route } from './routes/route-map';
import { QueryClient, QueryClientProvider } from 'react-query';
import './constance/color';
import { Suspense } from 'react';
import Loading from 'react-loading';
export const client = new QueryClient();
function App() {
  const elements = useRoutes(route);
  return (
    <QueryClientProvider client={client}>
      <Suspense
        fallback={
          <div
            style={{
              height: '100vh',
              width: '100vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loading type='spin' color='red' height={75} width={75} />
          </div>
        }
      >
        <div className='App'>{elements}</div>
      </Suspense>
    </QueryClientProvider>
  );
}
export default App;
