import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useMyPipelineItems } from '@modules/pipeline-items/query/pipeline-item.get';
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Deal statistic',
    },
  },
};

const labels = getMonthToShow();

interface EmailStatisticProps {}

const DealStatistic: React.FC<EmailStatisticProps> = ({}) => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data: pipelineItems } = useMyPipelineItems(id);
  const data = {
    labels: labels.map((item) => item.format('MMMM YYYY')),
    datasets: [
      {
        label: 'On proposing',
        data: labels.map((month) => {
          return pipelineItems?.filter(
            (item) =>
              isIn(item.createdAt.toString(), month) &&
              !item.pipelineColumn.isWon &&
              !item.isLose
          ).length;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Won',
        data: labels.map((month) => {
          return pipelineItems?.filter(
            (item) =>
              isIn(item.createdAt.toString(), month) &&
              item.pipelineColumn.isWon
          ).length;
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Lost',
        data: labels.map((month) => {
          return pipelineItems?.filter(
            (item) => isIn(item.createdAt.toString(), month) && item.isLose
          ).length;
        }),
        backgroundColor: 'rgba(125, 58, 193, 0.5)',
      },
    ],
  };
  return (
    <div style={{ height: 450 }}>
      <Bar options={{ ...options, maintainAspectRatio: false }} data={data} />
    </div>
  );
};

export default DealStatistic;
