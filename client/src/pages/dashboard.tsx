import { cardData, ICardData } from '@components/dashboard/data';
import { DashboardHeader } from '@components/dashboard/header';
import { LineChart } from '@components/dashboard/line-chart';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import '../stylesheets/dashboard.css';
export const DashBoard: React.FC = () => {
  const [data, setData] = useState<(ICardData & { index: number })[]>(
    cardData.map((item, index) => ({ ...item, index }))
  );
  const [
    {
      public_user_info: { firstName, lastName },
    },
  ] = useCookies([PUBLIC_USER_INFO]);

  return (
    <>
      <h1>
        Hello {firstName} {lastName}
        <div
          style={{
            marginTop: 20,
          }}
        >
          {/* dashboard's left side */}
          <DashboardHeader setData={setData} data={data} />
          <div>
            <LineChart height={300} width={600} />
          </div>
          {/* dashboard's right side */}
          <div></div>
        </div>
      </h1>
    </>
  );
};
