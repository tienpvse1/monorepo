import { UserAddOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';

interface AccountHeaderProps {
  toggle: () => void;
}

export const AccountHeader: React.FC<AccountHeaderProps> = ({ toggle }) => {
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
              onClick={toggle}
            >
              Add account
            </Button>
          </>
        }
      />
    </div>
  );
};
