import { RetweetOutlined } from '@ant-design/icons';
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
            <Tag color={'error'}>{chartType}</Tag>
            <Tooltip title='change'>
              <Dropdown
                overlay={
                  <Menu onSelect={(e) => navigate(`/statistic/${e.key}`)}>
                    <Menu.Item
                      onClick={() => handleMenuItemClicked('contacts')}
                    >
                      <Tag color={'volcano'}>Contacts</Tag>
                    </Menu.Item>
                    <Menu.Item onClick={() => handleMenuItemClicked('deal')}>
                      <Tag color={'purple'}>Deals</Tag>
                    </Menu.Item>
                    <Menu.Item onClick={() => handleMenuItemClicked('sold')}>
                      <Tag color={'green'}>Sold</Tag>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => handleMenuItemClicked('sent-email')}
                    >
                      <Tag color={'blue'}>Sent emails</Tag>
                    </Menu.Item>
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
