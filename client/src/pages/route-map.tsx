import SaleManagerLayout from '@common/sale-manager-layout';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('@pages/home'));
const Contact = lazy(() => import('@pages/contact'));
const LoginPage = lazy(() => import('@pages/login'));
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
const Company = lazy(() => import('@pages/company'));
const ForecastKanban = lazy(() => import('@pages/forecast-kanban'));
const SaleManage = lazy(() => import('@pages/sale-manager/sale-manage'));
const ContactContainer = lazy(() => import('@components/contact/contact'));
const ViewContactDetails = lazy(() => import('@pages/view-contact-details'));
const SaleManagerPipeline = lazy(() => import('@pages/sale-manager/pipeline'));
const ViewOpportunityDetails = lazy(
  () => import('@pages/view-opportunity-details')
);
const OpportunitiesContainer = lazy(
  () => import('@components/opportunity/opportunity-container')
);
const CompanyContainer = lazy(
  () => import('@components/company/company-container')
); 
const ViewCompanyDetails = lazy(
  () => import('@pages/view-company-details')
); 

const PipelineAdmin = lazy(() => import('@components/admin/pipeline-admin'))

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
            element: <OpportunitiesContainer />,
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
            element: <CompanyContainer />
          },
          {
            path: 'view-details/',
            element: <ViewCompanyDetails />
          }
        ]
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
        element: <PipelineAdmin />
      }
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
      {
        path: '/sale-manager/pipeline',
        element: <SaleManagerPipeline />,
      },
    ],
  },
  {
    path: '/*',
    element: <h1>Page not found</h1>,
  },
];