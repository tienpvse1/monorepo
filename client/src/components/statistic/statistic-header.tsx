import { RetweetOutlined } from '@ant-design/icons';
import {
  Button,
  Descriptions,
  PageHeader,
  Row,
  Statistic,
  Tag,
  Tooltip,
} from 'antd';

interface StatisticHeaderProps {}

export const StatisticHeader: React.FC<StatisticHeaderProps> = ({}) => {
  return (
    <>
      <PageHeader
        className='site-page-header'
        onBack={() => window.history.back()}
        title='Statistic'
        subTitle='an overview of your work'
        extra={[
          <Button key='3'>refresh</Button>,
          <Button key='2'>export</Button>,
          <Button key='1' type='primary'>
            report
          </Button>,
        ]}
      >
        <Descriptions size='small' column={3}>
          <Descriptions.Item
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            label='Type'
          >
            <Tag color={'error'}>Contact</Tag>
            <Tooltip title='change'>
              <RetweetOutlined />
            </Tooltip>
          </Descriptions.Item>
          <Descriptions.Item label='Calculate from'>
            2022-08-10
          </Descriptions.Item>
          <Descriptions.Item label='Calculate to'>2022-10-10</Descriptions.Item>
          <Descriptions.Item label='Remarks'>
            113 Nguyễn xí, P26, Vietnam
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </>
  );
};
