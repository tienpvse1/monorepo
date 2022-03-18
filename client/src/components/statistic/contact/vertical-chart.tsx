import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useCompanies } from '@modules/company/query/company.get';
import { useContacts } from '@modules/contact/query/contact.get';
import { Spin } from 'antd';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { useCookies } from 'react-cookie';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const VerticalChart = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthsToShow = [
    moment(new Date(currentYear, currentMonth, 0)).subtract(4, 'M'),
    moment(new Date(currentYear, currentMonth, 0)).subtract(3, 'M'),
    moment(new Date(currentYear, currentMonth, 0)).subtract(2, 'M'),
    moment(new Date(currentYear, currentMonth, 0)).subtract(1, 'M'),
    moment(new Date(currentYear, currentMonth, 0)),
    moment(new Date(currentYear, currentMonth, 0)).add(1, 'M'),
  ];
  const [
    {
      public_user_info: { id: accountId },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data: contacts, isLoading: loadingContacts } = useContacts(accountId);
  const { data: companies, isLoading: loadingCompanies } = useCompanies();
  if (loadingCompanies || loadingContacts) return <Spin size='large' />;
  const labels = monthsToShow.map((month) => month.format('MMMM YYYY'));

  const generateData = (): ChartData<'bar', number[], string> => {
    return {
      labels,
      datasets: [
        {
          label: 'Company',
          data: monthsToShow.map((month) => {
            return companies.filter((company) =>
              moment(company.createdAt)
                .add(1, 'M')
                .isBetween(month, month.clone().add(1, 'M'))
            ).length;
          }),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Contact',
          data: monthsToShow.map((month) => {
            const result = contacts.filter((contact) => {
              return moment(contact.createdAt)
                .add(1, 'M')
                .isBetween(month, month.clone().add(1, 'M'));
            }).length;

            return result;
            // return contacts.length;
          }),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Created contacts by time',
      },
    },
  };
  return (
    <div style={{ height: '60vh' }}>
      <Bar
        options={{ ...options, maintainAspectRatio: false }}
        data={generateData()}
      />
    </div>
  );
};
