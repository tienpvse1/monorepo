import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { useQueryContactsById } from '@modules/contact/query/contact.get';
import { Spin } from 'antd';
import { getMonthToShow, isIn } from '@util/date';

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
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Course statistic',
    },
  },
};

interface ContactHistoryTabProps {}

export const ContactHistoryTab: React.FC<ContactHistoryTabProps> = ({}) => {
  const { id } = useParams();
  const { data: contact, isLoading } = useQueryContactsById(id);
  const months = getMonthToShow();
  const labels = months.map((item) => item.format('MMMM YYYY'));

  const data = {
    labels,
    datasets: [
      {
        label: 'On proposing',
        data: months.map(
          (month) =>
            contact.pipelineItems.filter(
              (item) =>
                !item.isLose &&
                !item.pipelineColumn.isWon &&
                isIn(item.createdAt.toString(), month)
            ).length
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Won',
        data: months.map(
          (month) =>
            contact.pipelineItems.filter(
              (item) =>
                !item.isLose &&
                item.pipelineColumn.isWon &&
                isIn(item.createdAt.toString(), month)
            ).length
        ),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Lost',
        data: months.map(
          (month) =>
            contact.pipelineItems.filter(
              (item) =>
                item.isLose &&
                !item.pipelineColumn.isWon &&
                isIn(item.createdAt.toString(), month)
            ).length
        ),
        backgroundColor: 'rgba(135, 70, 206, 0.5)',
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin />
        </div>
      ) : (
        <Bar options={options} data={data} />
      )}
    </>
  );
};
