import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useMySentEmails } from '@modules/email/query/email.query';
import { useMyInboxEmails } from '@modules/inbox/query/inbox.get';
import { getMonthToShow, isIn } from '@util/date';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
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

interface SentEmailStatisticProps {}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Email Statistic',
    },
  },
};

const labels = getMonthToShow();

const SentEmailStatistic: React.FC<SentEmailStatisticProps> = ({}) => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data: sentEmails } = useMySentEmails(id);
  const { data: inboxEmails } = useMyInboxEmails(id);
  const data = {
    labels: labels.map((item) => item.format('MMMM YYYY')),
    datasets: [
      {
        label: 'Send',
        data: labels.map((month) => {
          return sentEmails?.filter((email) =>
            isIn(email.createdAt.toString(), month)
          ).length;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Receive',
        data: labels.map((month) => {
          return inboxEmails?.filter((email) =>
            isIn(email.createdAt.toString(), month)
          ).length;
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div style={{ height: 450 }}>
      <Bar options={{ ...options, maintainAspectRatio: false }} data={data} />
    </div>
  );
};

export default SentEmailStatistic;
