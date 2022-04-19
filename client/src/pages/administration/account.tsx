import { CreateAccountDrawer } from '@components/admin/account/create-account-drawer';
import { AccountHeader } from '@components/admin/account/header';
import { AccountTable } from '@components/admin/account/table';
import { useBooleanToggle } from '@mantine/hooks';

const Account: React.FC = ({}) => {
  const [isVisible, toggle] = useBooleanToggle(false);
  return (
    <div className='container-page'>
      <CreateAccountDrawer isVisible={isVisible} toggle={toggle} />
      <div>
        <AccountHeader toggle={toggle} />
      </div>
      <AccountTable />
    </div>
  );
};

export default Account;
