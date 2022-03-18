import { ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

interface PieChartProps {
  data: ChartData<'doughnut', number[], unknown>;
  options: any;
}

const DoughnutChart: React.FC<PieChartProps> = ({ data, options }) => {
  return <Doughnut {...{ data, options }} />;
};

export default DoughnutChart;
