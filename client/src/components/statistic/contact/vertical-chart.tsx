import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface VerticalChartProps {
  data: ChartData<'bar', number[], unknown>;
  options: any;
}

const VerticalChart: React.FC<VerticalChartProps> = ({ data, options }) => {
  return (
    <>
      <Bar {...{ data, options }} />
    </>
  );
};

export default VerticalChart;
