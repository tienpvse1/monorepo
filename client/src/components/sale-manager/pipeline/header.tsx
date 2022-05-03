import { DeleteOutlined } from '@ant-design/icons';
import { Button, Input, PageHeader } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface SaleManageHeaderProps {
  searchKey: string;
  setSearchKey: Dispatch<SetStateAction<string>>;
}

export const ManagerPipelineHeader: React.FC<SaleManageHeaderProps> = ({
  searchKey,
  setSearchKey,
}) => {
  const navigate = useNavigate();
  return (
    <div className='site-page-header-ghost-wrapper'>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title='Pipeline'
        extra={[
          <Input.Search
            onChange={(e) => setSearchKey(e.target.value)}
            style={{ width: 400 }}
          />,
          <Button
            key='1'
            onClick={() => navigate('opportunities-lost')}
            type='primary'
            icon={<DeleteOutlined />}
          >
            Lost Opportunities
          </Button>,
        ]}
      ></PageHeader>
    </div>
  );
};
