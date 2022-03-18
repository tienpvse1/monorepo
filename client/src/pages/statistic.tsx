import { VerticalChart } from '@components/statistic/contact/vertical-chart';
import { StatisticHeader } from '@components/statistic/statistic-header';

interface StatisticProps {}

const Statistic: React.FC<StatisticProps> = ({}) => {
  return (
    <div>
      <StatisticHeader />
      <VerticalChart />
    </div>
  );
};

export default Statistic;
