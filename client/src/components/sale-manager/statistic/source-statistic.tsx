import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SourceStatisticProps {}

const SourceStatistic: React.FC<SourceStatisticProps> = ({}) => {
  const data = {
    labels: [
      'Twitter',
      'Phone',
      'Youtube',
      'Facebook',
      'Instagram',
      'Direct meeting',
      'Presenter',
      'Advertisement',
      'Other',
    ],
    datasets: [
      {
        label: 'number of contacts',
        data: [4, 9, 6, 5, 5, 5, 10, 6, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        height: 500,
        width: 500,
      }}
    >
      <Radar
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
      ;
    </div>
  );
};

export default SourceStatistic;
