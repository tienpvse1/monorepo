import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, DropboxOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';

interface SaleManageHeaderProps { }

export const ManagerPipelineHeader: React.FC<SaleManageHeaderProps> = ({ }) => {
  const navigate = useNavigate();
  return (
    <div className='site-page-header-ghost-wrapper'>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title='Pipeline'
        extra={[
          <Button key='2'>
            <DropboxOutlined />
          </Button>,
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
