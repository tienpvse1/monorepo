import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement
);

export const options = {
  responsive: true,
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const stages = ['New', 'Qualified', 'Proposal', 'Won', 'Lose'];
interface ChartInterface {
  height: number | string;
  width: number | string;
}
export const LineChart: React.FC<ChartInterface> = ({ height, width }) => {
  const [data, setData] = useState<ChartData<'line', number[], string>>({
    labels,
    datasets: [],
  });
  const chartRef = useRef<ChartJS<'line', number[], string>>(null);

  useEffect(() => {
    if (chartRef.current) {
      // @ts-ignore
      var canvas = chartRef.current.canvas;
      var ctx = canvas.getContext('2d');
      var gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, 'rgb(238, 9, 121, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 106, 0, 0.1)');

      setData({
        labels,
        datasets: [
          {
            fill: 'start',
            backgroundColor: gradient,
            data: labels.map(() => Math.random() * 50),
            borderColor: 'rgb(255, 99, 132)',
          },
        ],
      });
    }
  }, [chartRef]);
  return (
    <div>
      <div style={{ height, width, marginTop: 20 }}>
        <Line
          ref={chartRef}
          options={{
            ...options,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                position: 'bottom',
                display: true,
                text: 'Chart.js Line Chart',
              },
            },
          }}
          width={10}
          height={5}
          data={data}
        />
      </div>
      <div style={{ height, width, marginTop: 20 }}>
        <Bar
          options={{
            ...options,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart',
                position: 'bottom',
              },
            },
          }}
          data={{
            labels: stages,
            datasets: [
              {
                data: [10, 20, 30, 22, 16, 19],
                backgroundColor: [
                  'rgba(255, 106, 0, 0.2)',
                  'rgba(255, 106, 0, 0.25)',
                  'rgba(255, 106, 0, 0.3)',
                  'rgba(255, 106, 0, 0.5)',
                  'rgba(255, 106, 0, 0.4)',
                ],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
