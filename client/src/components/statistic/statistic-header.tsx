import { RetweetOutlined } from '@ant-design/icons';
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

export const StatisticHeader: React.FC<StatisticHeaderProps> = () => {
  const [chartType, setChartType] = useState<
    'contacts' | 'email' | 'sent-email'
  >('contacts');
  const navigate = useNavigate();
  const handleMenuItemClicked = (path: 'contacts' | 'email' | 'sent-email') => {
    setChartType(path),
      navigate(`/statistic/${path === 'contacts' ? '' : path}`);
  };
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
                    <Menu.Item onClick={() => handleMenuItemClicked('email')}>
                      <Tag color={'purple'}>Received email</Tag>
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
