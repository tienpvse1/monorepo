import { cardData, ICardData } from '@components/dashboard/data';
import { DashboardHeader } from '@components/dashboard/header';
import { LineChart } from '@components/dashboard/line-chart';
import Upcoming from '@components/dashboard/upcoming';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useUpcomingEvents } from '@modules/schedule/query/schedule.get';
import { Calendar } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
export const DashBoard: React.FC = () => {
  const [data, setData] = useState<(ICardData & { index: number })[]>(
    cardData.map((item, index) => ({ ...item, index }))
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [
    {
      public_user_info: { firstName, lastName, id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);

  const { data: upcomingSchedule } = useUpcomingEvents({
    accountId: id,
    date: currentDate,
  });

  return (
    <>
      <h1>
        Hello {firstName} {lastName}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
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
                border: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '-2px 3px 3px 1px rgba(0, 0, 0, 0.05)',
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Calendar
                onSelect={(e) => setCurrentDate(e.toDate())}
                style={{
                  width: '19vw',
                }}
                fullscreen={false}
              />
            </div>
            <div
              style={{
                border: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '-2px 3px 3px 1px rgba(0, 0, 0, 0.05)',
                borderRadius: 10,
                padding: 10,
                marginTop: 10,
              }}
            >
              <h3>Upcoming events</h3>
              <div>
                {upcomingSchedule &&
                  upcomingSchedule.map((item) => (
                    <Upcoming
                      key={item.id}
                      by={`${item.account.firstName} ${item.account.lastName}`}
                      severity='info'
                      title={item.summary}
                      time={moment(new Date(item.dueDate)).fromNow()}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </h1>
    </>
  );
};
