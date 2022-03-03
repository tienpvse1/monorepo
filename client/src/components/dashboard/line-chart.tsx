import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
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
      display: false,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

interface ChartInterface {
  height: number;
  width: number;
}
export const LineChart: React.FC<ChartInterface> = ({ height, width }) => {
  const [data, setData] = useState<ChartData<'line', number[], string>>({
    labels,
    datasets: [],
  });
  const chartRef = useRef<ChartJS<'line', number[], string>>(null);

  useEffect(() => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(250,174,50,1)');
      gradient.addColorStop(1, 'rgba(250,174,50,0)');

      setData({
        labels,
        datasets: [
          {
            fill: 'start',
            backgroundColor: gradient,
            data: labels.map(() => Math.random() * 1000),
            borderColor: 'rgb(255, 99, 132)',
          },
        ],
      });
    }
  }, [chartRef]);
  return (
    <div style={{ height, width }}>
      <Line ref={chartRef} options={options} data={data} />
    </div>
  );
};
