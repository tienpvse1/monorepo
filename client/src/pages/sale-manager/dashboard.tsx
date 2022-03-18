import { ICardData } from '@components/dashboard/data';
import { DashboardHeader } from '@components/dashboard/header';
import { LineChart } from '@components/dashboard/line-chart';
import { Calendar } from 'antd';
import { useState } from 'react';

interface SaleManagerDashboardProps {}

const SaleManagerDashboard: React.FC<SaleManagerDashboardProps> = ({}) => {
  const [data, setData] = useState<(ICardData & { index: number })[]>([
    {
      index: 0,
      title: 'Total Opportunity',
      total: 59,
      updateStatus: 'since yesterday',
      variance: 9,
    },
    {
      index: 1,
      title: 'Total Opportunity',
      total: 59,
      updateStatus: 'since yesterday',
      variance: 9,
    },
    {
      index: 2,
      title: 'Total Opportunity',
      total: 59,
      updateStatus: 'since yesterday',
      variance: 9,
    },
  ]);
  return (
    <div>
      <>
        <h1>
          Hello sale manager
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
                <div></div>
              </div>
            </div>
          </div>
        </h1>
      </>
    </div>
  );
};

export default SaleManagerDashboard;
