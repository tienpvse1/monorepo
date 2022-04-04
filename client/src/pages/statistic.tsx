import { StatisticHeader } from '@components/statistic/statistic-header';
import { Outlet } from 'react-router-dom';

interface StatisticProps {}

const Statistic: React.FC<StatisticProps> = ({}) => {
  return (
    <div className='container-page'>
      <StatisticHeader />
      <Outlet />
    </div>
  );
};

export default Statistic;
