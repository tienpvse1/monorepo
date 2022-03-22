import SaleManagerLayout from '@common/sale-manager-layout';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Statistic from './statistic';

const HomePage = lazy(() => import('@pages/home'));
const Contact = lazy(() => import('@pages/contact'));
const LoginPage = lazy(() => import('@pages/login'));
const Company = lazy(() => import('@pages/company'));
const AdminPage = lazy(() => import('@pages/admin'));
const Product = lazy(() => import('@pages/product'));
const Schedule = lazy(() => import('@pages/schedule'));
const Pipeline = lazy(() => import('@pages/pipeline'));
const SignUpPage = lazy(() => import('@pages/signup'));
const Layout = lazy(() => import('@common/user-layout'));
const ProfilePage = lazy(() => import('@pages/profile'));
const AddContact = lazy(() => import('@pages/import-contact'));
const AdminLayout = lazy(() => import('@common/admin-layout'));
const EmailCompose = lazy(() => import('@pages/email-compose'));
const Opportunities = lazy(() => import('@pages/opportunities'));
const ForecastKanban = lazy(() => import('@pages/forecast-kanban'));
const SaleManage = lazy(() => import('@pages/sale-manager/sale-manage'));
const ContactContainer = lazy(() => import('@components/contact/contact'));
const SaleManagerDashboard = lazy(() => import('./sale-manager/dashboard'));
const ViewContactDetails = lazy(() => import('@pages/view-contact-details'));
const SaleManagerPipeline = lazy(() => import('@pages/sale-manager/pipeline'));
const ViewOpportunityDetails = lazy(
  () => import('@pages/view-opportunity-details')
);
const SalesOpportunityList = lazy(
  () => import('@components/sale/sales-opportunity-list')
);
const AllOpportunityList = lazy(
  () => import('@components/admin/all-opportunity-list')
);
const CompanyContainer = lazy(
  () => import('@components/company/company-container')
);
const ViewCompanyDetails = lazy(() => import('@pages/view-company-details'));

const PipelineAdmin = lazy(() => import('@components/admin/pipeline-admin'));
const AccountantLayout = lazy(() => import('@common/accountant-layout'));

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
        path: 'statistic',
        element: <Statistic />,
      },
      {
        path: 'email',
        element: <EmailCompose />,
      },
      {
        path: 'forecast',
        element: <ForecastKanban />,
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
            element: <SalesOpportunityList />,
          },
          {
            path: 'view-details/:id',
            element: <ViewOpportunityDetails />,
          },
        ],
      },
      {
        path: 'company',
        element: <Company />,
        children: [
          {
            index: true,
            element: <CompanyContainer />,
          },
          {
            path: 'view-details/:id',
            element: <ViewCompanyDetails />,
          },
        ],
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
      {
        path: 'pipeline',
        element: <PipelineAdmin />,
      },
    ],
  },
  {
    path: '/sale-manager',
    element: <SaleManagerLayout />,
    children: [
      {
        path: '/sale-manager/sale-manage',
        element: <SaleManage />,
      },
      {
        path: '/sale-manager/',
        element: <SaleManagerDashboard />,
      },
      {
        path: '/sale-manager/pipeline',
        element: <SaleManagerPipeline />,
      },
      {
        path: '/sale-manager/details/:id',
        element: <ViewOpportunityDetails />,
      },
    ],
  },
  {
    path: '/accountant',
    element: <AccountantLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'pipeline',
        element: <PipelineAdmin />,
      },
      {
        path: 'forecast',
        element: <ForecastKanban />
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
        path: 'opportunities',
        element: <Opportunities />,
        children: [
          {
            index: true,
            element: <AllOpportunityList />,
          },
          {
            path: 'view-details/:id',
            element: <ViewOpportunityDetails />,
          },
        ],
      }
    ],
  },
  {
    path: '/*',
    element: <h1>Page not found</h1>,
  },
];
