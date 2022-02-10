import { ErrorPage } from '@pages/error';
import 'antd/dist/antd.variable.min.css';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';


const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <CookiesProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </CookiesProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
