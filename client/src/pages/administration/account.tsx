import { AccountHeader } from '@components/admin/account/header';
import { AccountTable } from '@components/admin/account/table';

const Account: React.FC = ({}) => {
  return (
    <div>
      <div>
        <AccountHeader />
      </div>
      <AccountTable />
    </div>
  );
};

export default Account;
