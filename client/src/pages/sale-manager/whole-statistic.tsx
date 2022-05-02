import { Outlet } from 'react-router-dom';

interface WholeStatisticProps {}

const WholeStatistic: React.FC<WholeStatisticProps> = ({}) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default WholeStatistic;
