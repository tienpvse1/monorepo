import { useContactForStatistic } from '@modules/contact/query/contact.get';
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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SourceStatisticProps {}
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
const SourceStatistic: React.FC<SourceStatisticProps> = ({}) => {
  const { data: contacts } = useContactForStatistic();
  console.log(contacts);
  const labels: Label[] = [
    'Twitter',
    'Phone',
    'Youtube',
    'Facebook',
    'Instagram',
    'Direct meeting',
    'Presenter',
    'Advertisement',
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
        height: 500,
        width: 500,
      }}
    >
      <Radar
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
      ;
    </div>
  );
};

export default SourceStatistic;
