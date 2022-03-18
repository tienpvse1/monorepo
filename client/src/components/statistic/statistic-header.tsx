import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { Button, Descriptions, PageHeader, Radio, Tag, Tooltip } from 'antd';
import { Dispatch, SetStateAction } from 'react';

interface StatisticHeaderProps {
  chartType: 'vertical' | 'pie' | 'line';
  setChartType: Dispatch<SetStateAction<'vertical' | 'pie' | 'line'>>;
}

export const StatisticHeader: React.FC<StatisticHeaderProps> = ({
  chartType,
  setChartType,
}) => {
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
            label='Target'
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
          <Descriptions.Item
            style={{
              paddingTop: 10,
            }}
            label='Type'
          >
            <Radio.Group
              style={{
                transform: 'translateY(-3px )',
              }}
              defaultValue={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <Radio.Button value='vertical'>
                <BarChartOutlined />
              </Radio.Button>
              <Radio.Button value='pie'>
                <PieChartOutlined />
              </Radio.Button>
              <Radio.Button value='line'>
                <LineChartOutlined />
              </Radio.Button>
            </Radio.Group>
          </Descriptions.Item>
          <Descriptions.Item label='Remarks'>
            113 Nguyễn xí, P26, Vietnam
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </>
  );
};
