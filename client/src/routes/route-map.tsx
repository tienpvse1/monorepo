import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Pipeline = lazy(() => import('@pages/pipeline'));
const AdminPage = lazy(() => import('@pages/admin'));
const Contact = lazy(() => import('@pages/contact'));
const EmailCompose = lazy(() => import('@pages/email-compose'));
const SettingPage = lazy(() => import('@pages/setting'));
const HomePage = lazy(() => import('@pages/home'));
const LoginPage = lazy(() => import('@pages/login'));
const SignUpPage = lazy(() => import('@pages/signup'));
const LayoutAdmin = lazy(() => import('@pages/admin'));
const LayoutUser = lazy(() => import('@common/user-layout'));

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
        element: <Pipeline />,
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
    path: '/administration',
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
  {
    path: '/*',
    element: <h1>Page not found</h1>,
  },
];
