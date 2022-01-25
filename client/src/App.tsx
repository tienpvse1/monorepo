import { useRoutes } from 'react-router-dom';
import './stylesheets/App.scss';
import { route } from './routes/route-map';
import { QueryClient, QueryClientProvider } from 'react-query';
import './constance/color';

export const client = new QueryClient();
function App() {
  const elements = useRoutes(route);
  return (
    <QueryClientProvider client={client}>
      <div className='App'>{elements}</div>
    </QueryClientProvider>
  );
}
export default App;
