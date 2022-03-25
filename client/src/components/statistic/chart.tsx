import { lazy, useState } from 'react';

const ContactsChart = lazy(() => import('@components/statistic/contact/chart'));

const Chart: React.FC = () => {
  const [chartType, setChartType] = useState<'vertical' | 'pie' | 'line'>(
    'vertical'
  );
  const chartProps = {
    chartType,
    setChartType,
  };
  return (
    <>
      <ContactsChart {...chartProps} />
    </>
  );
};

export default Chart;
