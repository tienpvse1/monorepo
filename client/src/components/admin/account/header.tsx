import { UserAddOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';

interface AccountHeaderProps {}

export const AccountHeader: React.FC<AccountHeaderProps> = ({}) => {
  return (
    <div>
      <PageHeader
        className='site-page-header'
        onBack={() => history.back()}
        title='Account'
        subTitle='Manage your sales and sales manager'
        extra={
          <>
            <Button
              icon={<UserAddOutlined />}
              style={{ marginRight: 40 }}
              type={'primary'}
            >
              Add account
            </Button>
          </>
        }
      />
    </div>
  );
};
