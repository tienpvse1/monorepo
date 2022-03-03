import { cardData, ICardData } from '@components/dashboard/data';
import { DashboardHeader } from '@components/dashboard/header';
import { LineChart } from '@components/dashboard/line-chart';
import Upcoming from '@components/dashboard/upcoming';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Calendar } from 'antd';
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
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '20px',
          }}
        >
          <div
            style={{
              marginTop: 20,
              width: '55vw',
            }}
          >
            <DashboardHeader setData={setData} data={data} />
            <LineChart height={230} width={'100%'} />
          </div>
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Calendar
                style={{
                  width: '17vw',
                }}
                fullscreen={false}
              />
            </div>
            <div
              style={{
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 10,
                padding: 10,
                marginTop: 10,
              }}
            >
              <h3>Upcoming events</h3>
              <div>
                <Upcoming
                  by='Tienpvse'
                  severity='info'
                  title='Meeting with boss'
                  time='12h30-2h00pm'
                />
                <Upcoming
                  by='Tienpvse'
                  severity='info'
                  title='Meeting with boss'
                  time='12h30-2h00pm'
                />
              </div>
            </div>
          </div>
        </div>
      </h1>
    </>
  );
};
