import { DeleteOutlined, DropboxOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';

interface SaleManageHeaderProps {}

export const ManagerPipelineHeader: React.FC<SaleManageHeaderProps> = ({}) => {
  return (
    <div className='site-page-header-ghost-wrapper'>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title='Pipeline'
        extra={[
          <Button key='3'>
            <DeleteOutlined />
          </Button>,
          <Button key='2'>
            <DropboxOutlined />
          </Button>,
          <Button key='1' type='primary'>
            Primary
          </Button>,
        ]}
      ></PageHeader>
    </div>
  );
};
