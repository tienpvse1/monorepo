import { useContactForStatistic } from '@modules/contact/query/contact.get';
import { Descriptions, PageHeader, Select } from 'antd';
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
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
    <>
      <PageHeader
        className='site-page-header'
        onBack={() => null}
        title='Source statistic'
        subTitle="Analyze the customer's source"
      >
        <Descriptions column={2}>
          <Descriptions.Item label='Statistic type'>
            <Select
              style={{
                transform: 'translateY(-10px)',
              }}
              defaultValue='source'
              onChange={(value) =>
                value === 'deal'
                  ? navigate('/sale-manager/statistic/deal')
                  : value === 'contact' &&
                    navigate('/sale-manager/statistic/contact')
              }
            >
              <Select.Option key='contact'>Contact</Select.Option>
              <Select.Option key='deal'>Deals</Select.Option>
              <Select.Option key='source'>Source</Select.Option>
            </Select>
          </Descriptions.Item>
          <Descriptions.Item
            label='Total customer'
            style={{
              marginLeft: 50,
            }}
          >
            <span>Total contacts: {contacts.length}</span>
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
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
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
          ;
        </div>
      </div>
    </>
  );
};

export default SourceStatistic;
