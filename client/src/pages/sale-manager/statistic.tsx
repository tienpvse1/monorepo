import { StatisticHeader } from '@components/sale-manager/statistic/header';
import { LineChart } from '@components/sale-manager/statistic/line-chart';
import { IAccount } from '@interfaces/account';
import { useSaleAccounts } from '@modules/account/get/account.get';
import { Spin } from 'antd';
import { Moment } from 'moment';
import { Suspense, useState } from 'react';

interface StatisticProps {}

const ManagerStatistic: React.FC<StatisticProps> = ({}) => {
  const { data: sales } = useSaleAccounts(true);

  const [timeRange, setTimeRange] = useState<Moment[]>([]);
  const [currentSale, setCurrentSale] = useState<IAccount>(sales[0]);
  const headerProps = {
    timeRange,
    setTimeRange,
    currentSale,
    setCurrentSale,
    sales,
  };
  return (
    <div className='container-page'>
      <StatisticHeader {...headerProps} />
      <Suspense fallback={<Spin />}>
        <LineChart currentSale={currentSale} />
      </Suspense>
    </div>
  );
};

export default ManagerStatistic;
