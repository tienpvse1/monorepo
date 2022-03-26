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
const DealStatistic = lazy(
  () => import('@components/statistic/deal-statistic')
);
const SaleManage = lazy(() => import('@pages/sale-manager/sale-manage'));
const SalesContactList = lazy(
  () => import('@components/sale/sales-contact-list')
);
const SaleManagerDashboard = lazy(() => import('./sale-manager/dashboard'));
const ViewContactDetails = lazy(() => import('@pages/view-contact-details'));
const SaleManagerPipeline = lazy(() => import('@pages/sale-manager/pipeline'));
const ContactsChart = lazy(() => import('@components/statistic/chart'));
const SentEmailStatistic = lazy(
  () => import('@components/statistic/sent-email-statistic')
);
const ViewOpportunityDetails = lazy(
  () => import('@pages/view-opportunity-details')
);
const SalesOpportunityList = lazy(
  () => import('@components/sale/sales-opportunity-list')
);
const ListOfAllOpportunity = lazy(
  () => import('@components/admin/list-of-all-opportunity')
);
const ListOfAllCompany = lazy(
  () => import('@components/admin/list-of-all-company')
);
const SalesCompanyList = lazy(
  () => import('@components/sale/sales-company-list')
);
const ViewCompanyDetails = lazy(() => import('@pages/view-company-details'));

const PipelineAdmin = lazy(() => import('@components/admin/pipeline-admin'));
const AccountantLayout = lazy(() => import('@common/accountant-layout'));

const ListOfAllContact = lazy(
  () => import('@components/admin/list-of-all-contacts')
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
            element: <ListOfAllContact />,
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
        children: [
          {
            index: true,
            element: <ContactsChart />,
          },
          {
            path: '/statistic/deal',
            element: <DealStatistic />,
          },
          {
            path: '/statistic/sent-email',
            element: <SentEmailStatistic />,
          },
        ],
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
            element: <SalesCompanyList />,
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
        index: true,
        element: <SaleManagerDashboard />,
      },
      {
        path: 'sale-manage',
        element: <SaleManage />,
      },
      {
        path: 'pipeline',
        element: <SaleManagerPipeline />,
      },
      {
        path: 'company',
        element: <Company />,
        children: [
          {
            index: true,
            element: <ListOfAllCompany />,
          },
          {
            path: 'view-details/:id',
            element: <ViewCompanyDetails />,
          },
        ],
      },
      {
        path: 'contact',
        element: <Contact />,
        children: [
          {
            index: true,
            element: <ListOfAllContact />,
          },
          {
            path: 'view-details/:id',
            element: <ViewContactDetails />,
          },
        ],
      },
      {
        path: 'opportunities',
        element: <Opportunities />,
        children: [
          {
            index: true,
            element: <ListOfAllOpportunity />,
          },
          {
            path: 'view-details/:id',
            element: <ViewOpportunityDetails />,
          },
        ],
      },
      {
        path: 'forecast',
        element: <ForecastKanban />,
      },
      {
        path: 'schedule',
        element: <Schedule />,
      },
      {
        path: 'email',
        element: <EmailCompose />,
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
        element: <ForecastKanban />,
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
            element: <ListOfAllOpportunity />,
          },
          {
            path: 'view-details/:id',
            element: <ViewOpportunityDetails />,
          },
        ],
      },
    ],
  },
  {
    path: '/*',
    element: <h1>Page not found</h1>,
  },
];
