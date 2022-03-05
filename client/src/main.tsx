import { ErrorPage } from '@pages/error';
import 'antd/dist/antd.variable.min.css';
import { StrictMode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { render } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AbilityProvider } from './context/permission.context';
import 'primereact/resources/themes/tailwind-light/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';

render(
  <StrictMode>
    <AbilityProvider>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <CookiesProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </CookiesProvider>
      </ErrorBoundary>
    </AbilityProvider>
  </StrictMode>,
  document.getElementById('root')
);
