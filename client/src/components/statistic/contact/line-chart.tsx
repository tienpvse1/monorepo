import { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';

interface LineChartProps {
  data: ChartData<'line', number[], unknown>;
  options: any;
}

const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
  return <Line {...{ data, options }} />;
};

export default LineChart;
