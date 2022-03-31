import { RetweetOutlined } from '@ant-design/icons';
import { AntColorType } from '@constance/color';
import { getMonthToShow } from '@util/date';
import {
  Button,
  Descriptions,
  Dropdown,
  Menu,
  PageHeader,
  Tag,
  Tooltip,
} from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface StatisticHeaderProps {}
type ChartType = 'contacts' | 'deal' | 'sent-email' | 'sold';
const chartTypeWithColor: {
  label: string;
  color: AntColorType;
  key: ChartType;
}[] = [
  { key: 'contacts', color: 'volcano', label: 'Contacts' },
  { key: 'deal', color: 'purple', label: 'Deal' },
  { key: 'sent-email', color: 'blue', label: 'Sent emails' },
  { key: 'sold', color: 'green', label: 'Sold' },
];
export const StatisticHeader: React.FC<StatisticHeaderProps> = () => {
  const [chartType, setChartType] = useState<ChartType>('contacts');
  const navigate = useNavigate();
  const handleMenuItemClicked = (path: ChartType) => {
    setChartType(path),
      navigate(`/statistic/${path === 'contacts' ? '' : path}`);
  };
  const monthToShow = getMonthToShow();
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
            <Tag
              color={
                chartTypeWithColor.filter((item) => item.key === chartType)[0]
                  .color
              }
            >
              {chartType}
            </Tag>
            <Tooltip title='change'>
              <Dropdown
                trigger={['click']}
                overlay={
                  <Menu onSelect={(e) => navigate(`/statistic/${e.key}`)}>
                    {chartTypeWithColor.map((item) => (
                      <Menu.Item
                        key={item.key}
                        onClick={() => handleMenuItemClicked(item.key)}
                      >
                        <Tag color={item.color}>{item.label}</Tag>
                      </Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <RetweetOutlined />
              </Dropdown>
            </Tooltip>
          </Descriptions.Item>
          <Descriptions.Item label='Calculate from'>
            {monthToShow[0].format('DD MMMM YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label='Calculate to'>
            {monthToShow[monthToShow.length - 1].format('DD MMMM YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label='Remarks'>
            113 Nguyễn xí, P26, Vietnam
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </>
  );
};
