import { ErrorPage } from '@pages/error';
import 'antd/dist/antd.variable.min.css';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AbilityProvider } from './context/permission.context';

ReactDOM.render(
  <React.StrictMode>
    <AbilityProvider>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <CookiesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CookiesProvider>
      </ErrorBoundary>
    </AbilityProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
