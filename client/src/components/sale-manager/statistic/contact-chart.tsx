import { Is } from '@common/is';
import { Loading } from '@components/loading/loading';
import LineChart from '@components/statistic/contact/line-chart';
import DoughnutChart from '@components/statistic/contact/pie-chart';
import VerticalChart from '@components/statistic/contact/vertical-chart';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useCompanies } from '@modules/company/query/company.get';
import { useQueryAllContacts } from '@modules/contact/query/contact.get';
import { getMonthToShow, isIn } from '@util/date';
import { Spin } from 'antd';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Dispatch, SetStateAction, Suspense } from 'react';
import { useCookies } from 'react-cookie';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);
interface ChartInterface {
  chartType: 'vertical' | 'pie' | 'line';
  setChartType: Dispatch<SetStateAction<'vertical' | 'pie' | 'line'>>;
}

const Chart: React.FC<ChartInterface> = ({ chartType, setChartType }) => {
  const monthsToShow = getMonthToShow();
  const [
    {
      public_user_info: { id: accountId },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data: contacts, isLoading: loadingContacts } = useQueryAllContacts();
  const { data: companies, isLoading: loadingCompanies } = useCompanies();
  if (loadingCompanies || loadingContacts) return <Spin size='large' />;
  const labels = monthsToShow.map((month) => month.format('MMMM YYYY'));

  const data = {
    labels,
    datasets: [
      {
        label: 'Company',
        data: monthsToShow.map((month) => {
          return companies.filter((company) =>
            isIn(company.createdAt.toString(), month)
          ).length;
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Contact',
        data: monthsToShow.map((month) => {
          const result = contacts.filter((contact) =>
            isIn(contact.createdAt.toString(), month)
          ).length;

          return result;
          // return contacts.length;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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

  const chartProps = {
    options,
    data,
  };
  return (
    <div style={{ height: '60vh' }}>
      <Is condition={chartType === 'vertical'}>
        <Suspense fallback={<Loading />}>
          <VerticalChart {...chartProps} />
        </Suspense>
      </Is>
      <Is condition={chartType === 'pie'}>
        <Suspense fallback={<Loading />}>
          <DoughnutChart {...chartProps} />
        </Suspense>
      </Is>
      <Is condition={chartType === 'line'}>
        <Suspense fallback={<Loading />}>
          <LineChart {...chartProps} />
        </Suspense>
      </Is>
    </div>
  );
};

export default Chart;
