import { useState } from 'react';
import { ContactAndCompanyHeader } from './contact-and-company-header';
import Chart from './contact-chart';

const ContactAndCompany: React.FC = ({}) => {
  const [chartType, setChartType] = useState<'vertical' | 'pie' | 'line'>(
    'vertical'
  );
  const chartProps = {
    chartType,
    setChartType,
  };
  return (
    <div>
      <ContactAndCompanyHeader />
      <Chart {...chartProps} />
    </div>
  );
};

export default ContactAndCompany;
