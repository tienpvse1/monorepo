import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Contact = lazy(() => import('@pages/contact'));
const HomePage = lazy(() => import('@pages/home'));
const Pipelines = lazy(() => import('@pages/pipelines'));
const LoginPage = lazy(() => import('@pages/login'));
const AdminPage = lazy(() => import('@pages/admin'));
const AddContact = lazy(() => import('@pages/import-contact'));
const SignUpPage = lazy(() => import('@pages/signup'));
const LayoutUser = lazy(() => import('@common/user-layout'));
const SettingPage = lazy(() => import('@pages/setting'));
const LayoutAdmin = lazy(() => import('@pages/admin'));
const EmailCompose = lazy(() => import('@pages/email-compose'));

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
        path: 'pipelines',
        element: <Pipelines />
      },
      {
        path: 'email',
        element: <EmailCompose />,
      },
      {
        path: 'account',
        element: <SettingPage />,
      },
      {
        path: 'import-contact',
        element: <AddContact />,
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
