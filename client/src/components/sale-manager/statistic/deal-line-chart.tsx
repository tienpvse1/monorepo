import { useStages } from '@modules/pipeline-column/query/pipeline-column.get';
import { getRandomRgba } from '@util/color';
import { getMonthToShow, isIn } from '@util/date';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
interface DealLineChartProps {}

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const DealLineChart: React.FC<DealLineChartProps> = ({}) => {
  const months = getMonthToShow();
  const labels = months.map((month) => month.format('MMMM YYYY'));
  const { data: stages } = useStages();
  const data = {
    labels,
    datasets: [
      // {
      //   label: 'Contacts',
      //   data: months.map(
      //     (month) =>
      //       contacts.filter((item) => isIn(item.createdAt.toString(), month))
      //         .length
      //   ),
      //   borderColor: 'rgb(255, 99, 132)',
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
      ...stages.map((stage) => ({
        label: stage.name,
        data: months.map(
          (month) =>
            stage.pipelineItems.filter((item) =>
              isIn(item.createdAt.toString(), month)
            ).length
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: getRandomRgba(0.45),
      })),
    ],
  };
  return <Bar options={options} data={data} />;
};
