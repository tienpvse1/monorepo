import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { handleUndefinedString } from '@util/undefined';
import { Descriptions, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { FC } from 'react';
import { InfoWrapper } from './info-wrapper';

interface ContactInfoProps {
  data: IPipelineItem;
}

export const ContactInfo: FC<ContactInfoProps> = ({ data }) => {
  return (
    <div>
      <span style={{ fontSize: '17px' }}>
        <p style={{ fontWeight: '600', fontSize: '20px' }}>{data.title}</p>
        <span style={{ fontWeight: '600' }}>
          {handleUndefinedString(data.expectedRevenue.toString())}$
        </span>{' '}
        at
        {/* //TODO: this field is still hard-coded */}
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
            {handleUndefinedString(data.email)}
          </Descriptions.Item>
          <Descriptions.Item label='Telephone'>
            {handleUndefinedString(data.phone)}
          </Descriptions.Item>
          <Descriptions.Item label='Mobile'>
            {handleUndefinedString(data.mobile)}
          </Descriptions.Item>
        </Descriptions>
      </InfoWrapper>
      <InfoWrapper title='Addresses'>
        <Table
          pagination={false}
          dataSource={data.addresses}
          rowKey={(record) => record.id}
        >
          <Column title='Address type' dataIndex='type' key='age' />
          <Column title='Address' dataIndex='address' key='address' />
          <Column title='City' dataIndex='city' key='address' />
          <Column title='Country' dataIndex='country' key='address' />
        </Table>
      </InfoWrapper>
      <InfoWrapper title='Noteworthy events'>
        <Table
          pagination={false}
          dataSource={data.noteWorthies}
          rowKey={(record) => record.id}
        >
          <Column title='Name' dataIndex='name' key='name' />
          <Column title='Date' dataIndex='date' key='date' />
        </Table>
      </InfoWrapper>
    </div>
  );
};
