import SaleManagerLayout from '@common/sale-manager-layout';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Contact = lazy(() => import('@pages/contact'));
const HomePage = lazy(() => import('@pages/home'));
const Pipeline = lazy(() => import('@pages/pipeline'));
const LoginPage = lazy(() => import('@pages/login'));
const AdminPage = lazy(() => import('@pages/admin'));
const AddContact = lazy(() => import('@pages/import-contact'));
const SignUpPage = lazy(() => import('@pages/signup'));
const Layout = lazy(() => import('@common/user-layout'));
const ProfilePage = lazy(() => import('@pages/profile'));
const AdminLayout = lazy(() => import('@common/admin-layout'));
const EmailCompose = lazy(() => import('@pages/email-compose'));
const Product = lazy(() => import('@pages/product'));
const Opportunities = lazy(() => import('@pages/opportunities'));
const Leads = lazy(() => import('@pages/leads'));
const SaleManage = lazy(() => import('@pages/sale-manager/sale-manage'));
const ViewContactDetails = lazy(() => import('@pages/view-contact-details'));
const ViewOpportunityDetails = lazy(
  () => import('@pages/view-opportunity-details')
);
const ContactContainer = lazy(() => import('@components/contact/contact'));
const Schedule = lazy(() => import('@pages/schedule'));
const OpportunitiesContainer = lazy(
  () => import('@components/opportunity/opportunity-container')
);

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
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'contact',
        element: <Contact />,
        children: [
          {
            index: true,
            element: <ContactContainer />,
          },
          {
            path: 'view-details/:id',
            element: <ViewContactDetails />,
          },
        ],
      },
      {
        path: 'pipeline',
        element: <Pipeline />,
      },
      {
        path: 'schedule',
        element: <Schedule />,
      },
      {
        path: 'email',
        element: <EmailCompose />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'import-contact',
        element: <AddContact />,
      },
      {
        path: 'product',
        element: <Product />,
      },
      {
        path: 'opportunities',
        element: <Opportunities />,
        children: [
          {
            index: true,
            element: <OpportunitiesContainer />,
          },
          {
            path: 'view-details/:id',
            element: <ViewOpportunityDetails />,
          },
        ],
      },
      {
        path: 'leads',
        element: <Leads />,
      },
    ],
  },
  {
    path: '/administration',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
  {
    path: '/sale-manager',
    element: <SaleManagerLayout />,
    children: [
      {
        index: true,
        element: <SaleManage />,
      },
    ],
  },
  {
    path: '/*',
    element: <h1>Page not found</h1>,
  },
];
