import SaleManagerLayout from '@common/sale-manager-layout';
import AssignTaskForLeader from '@components/assign-task';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import Statistic from './statistic';
const Inbox = lazy(() => import('./inbox'));
const Email = lazy(() => import('./email'));
const Tag = lazy(() => import('@pages/tag'));
const Discount = lazy(() => import('./discount'));
const HomePage = lazy(() => import('@pages/home'));
const Contact = lazy(() => import('@pages/contact'));
const LoginPage = lazy(() => import('@pages/login'));
const Company = lazy(() => import('@pages/company'));
const AdminPage = lazy(() => import('@pages/admin'));
const Product = lazy(() => import('@pages/product'));
const SentEmails = lazy(() => import('./sent-email'));
const Schedule = lazy(() => import('@pages/schedule'));
const Pipeline = lazy(() => import('@pages/pipeline'));
const SignUpPage = lazy(() => import('@pages/signup'));
const Layout = lazy(() => import('@common/user-layout'));
const ProfilePage = lazy(() => import('@pages/profile'));
const MapStatistic = lazy(() => import('./map-statistic'));
const EmailContent = lazy(() => import('./email-content'));
const Account = lazy(() => import('./administration/account'));
const AddContact = lazy(() => import('@pages/import-contact'));
const AdminLayout = lazy(() => import('@common/admin-layout'));
const EmailCompose = lazy(() => import('@pages/email-compose'));
const Activity = lazy(() => import('./administration/activity'));
const EmailDesign = lazy(() => import('./administration/email'));
const Opportunities = lazy(() => import('@pages/opportunities'));
const LostOpportunity = lazy(() => import('./lost-opportunity'));
const SentItem = lazy(() => import('@components/sent-email/item'));
const ForecastKanban = lazy(() => import('@pages/forecast-kanban'));

const SourceAnalytic = lazy(() => import('@components/statistic/source'));
// const ManagerContact = lazy(() => import('./sale-manager/contacts'));
const ManagerStatistic = lazy(() => import('./sale-manager/statistic'));
const ListSentEmails = lazy(() => import('@components/sent-email/list'));
const WholeStatistic = lazy(() => import('./sale-manager/whole-statistic'));
const SourceStatistic = lazy(
  () => import('@components/sale-manager/statistic/source-statistic')
);

const SaleDiscountPage = lazy(() => import('@pages/sale-discount-page'));
const ContactAndCompany = lazy(
  () => import('@components/sale-manager/statistic/contact-and-company')
);
const SoldCoursesStatistic = lazy(
  () => import('@components/statistic/sold-course')
);
const DealStatistic = lazy(
  () => import('@components/statistic/deal-statistic')
);
const SaleManage = lazy(() => import('@pages/sale-manager/sale-manage'));
const Team = lazy(() => import('@pages/sale-manager/team'));
const TeamChart = lazy(() => import('@pages/sale-manager/team-chart'));
const SaleManagerDashboard = lazy(() => import('./sale-manager/dashboard'));
const ViewContactDetails = lazy(() => import('@pages/view-contact-details'));
const PipelineManager = lazy(() => import('@pages/sale-manager/pipeline'));
const ContactsChart = lazy(() => import('@components/statistic/chart'));
const SaleManagerDealStatistic = lazy(
  () => import('@components/sale-manager/statistic/deals')
);
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

const AdminPipeline = lazy(() => import('@components/admin/admin-pipeline'));
const AccountantLayout = lazy(() => import('@common/accountant-layout'));

const ListOfAllContact = lazy(
  () => import('@components/admin/list-of-all-contacts')
);
const SalesContactList = lazy(
  () => import('@components/sale/sales-contact-list')
);

const SalesOpportunityLost = lazy(
  () => import('@components/sale/sales-opportunity-lost')
);
const PipelineSale = lazy(() => import('@components/sale/pipeline-sale'));
const SaleManagerPipeline = lazy(
  () => import('@pages/sale-manager/sale-manager-pipeline')
);
const ListAllOpportunityLost = lazy(
  () => import('@components/sale-manager/list-all-opportunity-lost')
);
const MyCalendar = lazy(() => import('@components/schedule/calendar'));
const ListSchedule = lazy(() => import('@components/schedule/list'));
const Rank = lazy(() => import('@pages/rank'));
const Proposal = lazy(() => import('@pages/proposal'));

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
            element: <SalesContactList />,
          },
          {
            path: 'view-details/:id',
            element: <ViewContactDetails />,
          },
          {
            path: 'import-contact',
            element: <AddContact />,
          },
        ],
      },
      {
        path: 'assign-task',
        element: <AssignTaskForLeader />,
      },
      {
        path: 'pipeline',
        element: <Pipeline />,
        children: [
          {
            index: true,
            element: <PipelineSale />,
          },
          {
            path: 'opportunities-lost',
            element: <SalesOpportunityLost />,
          },
        ],
      },
      {
        path: 'schedule',
        element: <MyCalendar />,
      },
      {
        path: 'proposal',
        element: <Proposal />,
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
            path: '/statistic/sold',
            element: <SoldCoursesStatistic />,
          },
          {
            path: '/statistic/sent-email',
            element: <SentEmailStatistic />,
          },
          {
            path: '/statistic/source',
            element: <SourceAnalytic />,
          },
        ],
      },
      {
        path: 'email',
        element: <Email />,
        children: [
          {
            path: '/email/',
            element: <EmailCompose />,
          },
          {
            path: '/email/inbox',
            element: <Inbox />,
          },
          {
            path: '/email/outside-mails',
            element: <Inbox />,
          },
          {
            path: '/email/sent',
            element: <SentEmails />,
            children: [
              {
                path: '/email/sent/',
                element: <ListSentEmails />,
              },
              {
                path: '/email/sent/:id',
                element: <SentItem />,
              },
            ],
          },
          {
            path: '/email/:id',
            element: <EmailContent />,
          },
        ],
      },
      {
        path: 'map-statistic',
        element: <MapStatistic />,
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
        path: 'lost-opportunities',
        element: <LostOpportunity />,
      },
      {
        path: 'product',
        element: <Product />,
      },
      {
        path: 'discount',
        element: <SaleDiscountPage />,
      },
      {
        path: 'tag',
        element: <Tag />,
      },
      {
        path: 'rank',
        element: <Rank />,
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

  /**
   * !administration routes
   */
  {
    path: '/administration',
    element: <AdminLayout />,
    children: [
      {
        path: '/administration/dashboard',
        element: <AdminPage />,
      },
      {
        path: 'pipeline',
        element: <AdminPipeline />,
      },
      {
        index: true,
        path: '/administration/',
        element: <Account />,
      },
      {
        path: '/administration/activity',
        element: <Activity />,
      },
      {
        path: '/administration/email',
        element: <EmailDesign />,
      },
      {
        path: 'contact-tags',
        element: <Tag />,
      },
    ],
  },

  /**
   * !Sale manager routes
   */
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
        element: <Team />,
        children: [
          {
            index: true,
            element: <SaleManage />,
          },
          {
            path: 'team-chart',
            element: <TeamChart />,
          },
        ],
      },
      {
        path: 'pipeline',
        element: <PipelineManager />,
        children: [
          {
            index: true,
            element: <SaleManagerPipeline />,
          },
          {
            path: 'opportunities-lost',
            element: <ListAllOpportunityLost />,
          },
        ],
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
          {
            path: 'import-contact',
            element: <AddContact />,
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
        path: 'lost-opportunities',
        element: <LostOpportunity />,
      },
      {
        path: 'proposal',
        element: <Proposal />,
      },
      {
        path: 'product',
        element: <Product />,
      },
      {
        path: 'forecast',
        element: <ForecastKanban />,
      },
      {
        path: 'discount',
        element: <Discount />,
      },
      {
        path: '/sale-manager/statistic',
        element: <WholeStatistic />,
        children: [
          {
            index: true,
            element: <ManagerStatistic />,
          },
          {
            path: '/sale-manager/statistic/total-contact-and-company',
            element: <ContactAndCompany />,
          },
          {
            path: '/sale-manager/statistic/deal',
            element: <SaleManagerDealStatistic />,
          },
          {
            path: '/sale-manager/statistic/source',
            element: <SourceStatistic />,
          },
        ],
      },
      {
        path: 'schedule',
        element: <Schedule />,
        children: [
          {
            index: true,
            element: <MyCalendar />,
          },
          {
            path: 'list-all',
            element: <ListSchedule />,
          },
        ],
      },
      {
        path: 'email',
        element: <EmailCompose />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
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
        element: <AdminPipeline />,
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
