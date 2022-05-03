import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useAllMyContact } from '@modules/contact/query/contact.get';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { useCookies } from 'react-cookie';

interface SourceAnalyticProps {}
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type Label =
  | 'Twitter'
  | 'Phone'
  | 'Youtube'
  | 'Facebook'
  | 'Instagram'
  | 'Direct meeting'
  | 'Presenter'
  | 'Advertisement'
  | 'Other';
const SourceAnalytic: React.FC<SourceAnalyticProps> = ({}) => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data: contacts } = useAllMyContact(id);
  const labels: Label[] = [
    'Advertisement',
    'Direct meeting',
    'Facebook',
    'Instagram',
    'Phone',
    'Presenter',
    'Twitter',
    'Youtube',
    'Other',
  ];
  const data = {
    labels,
    datasets: [
      {
        label: 'number of contacts',
        data: labels.map((label) => {
          if (label === 'Direct meeting') {
            return contacts.filter(
              (contact) => contact.company.source === 'DirectMeeting'
            ).length;
          } else {
            return contacts.filter(
              (contact) => contact.company.source === label
            ).length;
          }
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          height: 500,
          width: 500,
        }}
      >
        <Radar
          data={data}
          options={{ maintainAspectRatio: false, responsive: true }}
        />
        ;
      </div>
    </div>
  );
};

export default SourceAnalytic;
