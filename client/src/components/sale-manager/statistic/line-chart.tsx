import { IAccount } from '@interfaces/account';
import {
  useContacts,
  useContactsForManagerStatistic,
} from '@modules/contact/query/contact.get';
import { getMonthToShow, isIn } from '@util/date';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { FC } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Contact created by sales',
    },
  },
};

export interface ILineChart {
  currentSale: IAccount;
}

export const LineChart: FC<ILineChart> = ({ currentSale }) => {
  const months = getMonthToShow();
  const labels = months.map((month) => month.format('MMMM YYYY'));
  const { data: contacts } = useContactsForManagerStatistic(
    currentSale.id,
    true
  );
  const data = {
    labels,
    datasets: [
      {
        label: 'Contacts',
        data: months.map(
          (month) =>
            contacts.filter((item) => isIn(item.createdAt.toString(), month))
              .length
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <div style={{ height: 500 }}>
      <Line options={{ ...options, maintainAspectRatio: false }} data={data} />
    </div>
  );
};
