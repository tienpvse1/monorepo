import { Descriptions, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { FC } from 'react';
import { InfoWrapper } from './info-wrapper';

interface ContactInfoProps {}

export const ContactInfo: FC<ContactInfoProps> = ({}) => {
  const data = [
    {
      type: 'Home',
      address: 'some where in vietnam',
      city: 'HCMC',
      country: 'Vietnam',
    },
  ];
  const noteWorthyData = [
    {
      name: 'birthday',
      date: '27/10/2000',
    },
    {
      name: 'graduate',
      date: '01/05/2022',
    },
  ];

  return (
    <div>
      <span style={{ fontSize: '17px' }}>
        <p style={{ fontWeight: '600', fontSize: '20px' }}>Phan Văn Tiến</p>
        <span style={{ fontWeight: '600' }}>5,000$</span> at
        <span style={{ fontWeight: '600' }}> 69.96%</span>
      </span>
      <InfoWrapper title='communication options'>
        <Descriptions
          column={2}
          title={
            <span
              style={{
                fontWeight: '600',
              }}
            >
              User info
            </span>
          }
        >
          <Descriptions.Item label='Email'>
            tienpvse@gmail.com
          </Descriptions.Item>
          <Descriptions.Item label='Telephone'>
            +84 779 7995 55
          </Descriptions.Item>
          <Descriptions.Item label='Mobile'>+84 779 7995 55 </Descriptions.Item>
        </Descriptions>
      </InfoWrapper>
      <InfoWrapper title='Addresses'>
        <Table pagination={false} dataSource={data}>
          <Column title='Address type' dataIndex='type' key='age' />
          <Column title='Address' dataIndex='address' key='address' />
          <Column title='City' dataIndex='city' key='address' />
          <Column title='Country' dataIndex='country' key='address' />
        </Table>
      </InfoWrapper>
      <InfoWrapper title='Noteworthy events'>
        <Table pagination={false} dataSource={noteWorthyData}>
          <Column title='Name' dataIndex='name' key='name' />
          <Column title='Date' dataIndex='date' key='date' />
        </Table>
      </InfoWrapper>
    </div>
  );
};
