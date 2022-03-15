import { EllipsisOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';

interface SaleManageHeaderProps {}

export const SaleManageHeader: React.FC<SaleManageHeaderProps> = ({}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Button
        type='default'
        style={{
          height: 50,
          width: 50,
        }}
        shape='round'
        icon={<LeftOutlined />}
      />
      <div>
        <span style={{ opacity: 0.7 }}>Manage</span>
        <h2
          style={{
            display: 'flex',
            fontSize: 23.5,
          }}
        >
          Sale Manage{' '}
          <span>
            <EllipsisOutlined
              style={{
                marginLeft: 20,
                transform: 'translateY(2px)',
                opacity: 0.7,
              }}
            />
          </span>
        </h2>
        <div>
          <Tag color={'volcano'}>Opportunity</Tag>
          <Tag color={'cyan'}>Sales</Tag>
          <Tag color={'volcano'}>Manage</Tag>
        </div>
      </div>
    </div>
  );
};
