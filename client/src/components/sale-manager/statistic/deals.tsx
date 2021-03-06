import { DealHeader } from './deal-header';
import { DealLineChart } from './deal-line-chart';

interface SaleManagerStatisticProps {}

const SaleManagerDealStatistic: React.FC<SaleManagerStatisticProps> = ({}) => {
  return (
    <div>
      <DealHeader />
      <DealLineChart />
    </div>
  );
};

export default SaleManagerDealStatistic;
