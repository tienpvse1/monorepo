import { PUBLIC_USER_INFO } from '@constance/cookie';
import { getMonthToShow, isIn } from '@util/date';
import { useCookies } from 'react-cookie';
import { options } from './deal-statistic';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useMyOpportunityRevenue } from '@modules/opportunity-revenue/query/opportunity-revenue.get';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SoldCoursesStatisticProps {}

const labels = getMonthToShow();
const SoldCoursesStatistic: React.FC<SoldCoursesStatisticProps> = ({}) => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data: soldCourses } = useMyOpportunityRevenue(id);
  const data = {
    labels: labels.map((item) => item.format('MMMM YYYY')),
    datasets: [
      {
        label: 'Sold courses',
        data: labels.map((month) => {
          return soldCourses?.filter((course) =>
            isIn(course.createdAt.toString(), month)
          ).length;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div style={{ height: 450 }}>
      <Bar options={{ ...options, maintainAspectRatio: false }} data={data} />
    </div>
  );
};

export default SoldCoursesStatistic;
