import { ProfileDetails } from '@components/setting/profile-details';
import { Menu } from 'primereact/menu';

const Profile = () => {
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
          minHeight: '50vh',
          width: '25%',
          borderTop: 'none',
          borderLeft: 'none'
        }}
      />
      <ProfileDetails />
    </div>
  );
};

export default Profile;
