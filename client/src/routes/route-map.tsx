import { Pipeline } from '@pages/pipeline';
import { Contact } from '@pages/contact';
import { EmailCompose } from '@pages/email-compose';
import { SettingPage } from '@pages/setting';
import { RouteObject } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages/login';
import { SignUpPage } from '../pages/signup';
import { LayoutAdmin } from '@common/admin-layout';
import { AdminPage } from '@pages/admin';
import { LayoutUser } from '@common/user-layout';


export const route: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },

  {
    path: '/',
    element: <LayoutUser />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'pipeline',
        element: <Pipeline />
      },
      {
        path: 'email',
        element: <EmailCompose />,
      },
      {
        path: 'account',
        element: <SettingPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <AdminPage />
      }
    ]
  },
  {
    path: '/*',
    element: <h1>Page not found</h1>,
  },
];
