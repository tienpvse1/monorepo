import { Profile } from '@components/setting/profile';
import { Menu } from 'primereact/menu';

const SettingPage = () => {
  return (
    <div
      className='setting-container'
      style={{
        display: 'flex',
        paddingBottom: 90,
      }}
    >
      <Menu
        model={[
          { label: 'Edit profile', icon: 'pi pi-fw pi-plus' },
          { label: 'Notification', icon: 'pi pi-bell' },
          { label: 'Analysis', icon: 'pi pi-chart-line' },
          { label: 'Password and security', icon: 'pi pi-unlock' },
        ]}
        style={{
          minHeight: '80vh',
          width: '25%',
        }}
      />
      <Profile />
    </div>
  );
};

export default SettingPage;
