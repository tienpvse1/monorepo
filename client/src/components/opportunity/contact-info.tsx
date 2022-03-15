import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { handleUndefinedString } from '@util/undefined';
import { Descriptions, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { InfoWrapper } from './info-wrapper';

interface ContactInfoProps {
  data: IPipelineItem;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ data }) => {
  return (
    <div>
      <span style={{ fontSize: '17px' }}>
        <p style={{ fontWeight: '600', fontSize: '20px' }}>{data.title}</p>
        <span style={{ fontWeight: '600' }}>
          {/* {handleUndefinedString(data.expectedRevenue.toString())}$ */}
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
            {handleUndefinedString(data.contact.email)}
          </Descriptions.Item>
          <Descriptions.Item label='Telephone'>
            {handleUndefinedString(data.contact.phone)}
          </Descriptions.Item>
          <Descriptions.Item label='Mobile'>
            {handleUndefinedString(data.contact.mobile)}
          </Descriptions.Item>
        </Descriptions>
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
