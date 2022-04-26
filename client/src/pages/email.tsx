import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';
import { Outlet } from 'react-router-dom';

interface EmailProps {}

const Email: React.FC<EmailProps> = ({}) => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          width: '20vw',
          minHeight: '80vh',
        }}
      >
        <Menu
          style={{
            height: '100%',
          }}
          model={[
            { label: 'New', icon: 'pi pi-fw pi-plus', url: '/email/' },
            { label: 'Inbox', icon: PrimeIcons.INBOX, url: '/email/inbox' },
            { label: 'Sent', icon: PrimeIcons.CHECK, url: '/email/sent' },
            {
              label: 'Outside mails',
              icon: PrimeIcons.BOX,
              url: '/email/outside-mails',
            },
          ]}
        />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Email;
