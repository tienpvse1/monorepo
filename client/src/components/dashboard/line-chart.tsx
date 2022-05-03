import { useOpportunityWithOrder } from '@modules/opportunity-history/query/opportunity-history.get';
import { useStages } from '@modules/pipeline-column/query/pipeline-column.get';
import { getMonthToShow, isIn } from '@util/date';
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
  ScatterDataPoint,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useRef } from 'react';
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

interface ChartInterface {
  height: number | string;
  width: number | string;
}

export const LineChart: React.FC<ChartInterface> = ({ height, width }) => {
  const { data: opportunityHistory } = useOpportunityWithOrder();
  const { data: stages } = useStages();
  const monthToShow = getMonthToShow();
  const ref = useRef<ChartJS<'line'>>();
  const labels = stages.map(({ name, id }) => ({ name, id }));
  const options = {
    responsive: true,
  };
  // @ts-ignore
  const generateData = (): ChartData<
    'line',
    (number | ScatterDataPoint)[],
    unknown
  > => {
    // @ts-ignore
    if (ref.current) {
      var ctx = ref.current.canvas.getContext('2d');
      var gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, 'rgb(238, 9, 121, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 106, 0, 0.1)');

      return {
        labels: monthToShow.map((item) => item.format('MMMM YYYY')),
        datasets: labels.map((label) => {
          return {
            fill: false,
            backgroundColor: gradient,
            data: monthToShow.map((month) => {
              return opportunityHistory.filter(
                (history) =>
                  isIn(history.createdAt.toString(), month) &&
                  history.newStage?.id === label.id
              ).length;
            }),
            borderColor: 'rgb(255, 99, 132)',
            label: label.name,
          };
        }),
      };
    } else {
      return {
        datasets: [],
        labels: [],
      };
    }
  };

  return (
    <div>
      <div style={{ height, width, marginTop: 20 }}>
        <Line
          ref={ref}
          options={{
            ...options,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
              title: {
                position: 'bottom',
                display: true,
                text: 'Opportunity analysis by stages and time',
              },
            },
          }}
          width={10}
          height={5}
          data={generateData()}
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
                text: 'Opportunity overview',
                position: 'bottom',
              },
            },
          }}
          data={{
            labels: stages ? stages.map((item) => item.name) : [],
            datasets: [
              {
                data: stages
                  ? stages.map((item) => item.pipelineItems.length)
                  : [],
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
