import { StatisticHeader } from '@components/statistic/statistic-header';
import { lazy, useState } from 'react';
const Chart = lazy(
  () => import('@components/statistic/contact/chart')
);

interface StatisticProps {}

const Statistic: React.FC<StatisticProps> = ({}) => {
  const [chartType, setChartType] = useState<'vertical' | 'pie' | 'line'>(
    'vertical'
  );
  const chartProps = {
    chartType,
    setChartType,
  };
  return (
    <div>
      <StatisticHeader {...chartProps} />
      <Chart {...chartProps} />
    </div>
  );
};

export default Statistic;
