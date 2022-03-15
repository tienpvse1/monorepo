import { ProfileInfo } from '@components/profile/profile-info';
import { Inplace } from '@components/setting/inplace';
import { Button, Space } from 'antd';

interface ProfileEditFormProps {
  toggleEditForm: () => void;
  publicData: any;
  showToast?: () => void;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ toggleEditForm, publicData, showToast }) => {
  return (
    <>
      <ProfileInfo label='First Name'>
        <Inplace
          label='First Name'
          inputStyle={{ width: '100%' }}
          defaultValue={publicData.firstName}
          showToast={showToast}
        />
      </ProfileInfo>
      <ProfileInfo label='Last Name'>
        <Inplace
          label='Last Name'
          inputStyle={{ width: '100%' }}
          defaultValue={publicData.lastName}
          field='lastName'
          showToast={showToast}
        />
      </ProfileInfo>
      <ProfileInfo label='Email'>
        <Inplace
          defaultValue={publicData.email}
          label='Email'
          inputStyle={{ width: '100%' }}
          field='email'
          showToast={showToast}
        />
      </ProfileInfo>
      <ProfileInfo label='Phone'>
        <Inplace
          defaultValue='+84 779 799 555'
          label={publicData.phone}
          inputStyle={{ width: '100%' }}
          showToast={showToast}
        />
      </ProfileInfo>
      <ProfileInfo label='Address'>
        Go dua thu duc, Ho Chi Minh, Vietnam
      </ProfileInfo>
      <ProfileInfo label='Team'>
        Team Coca Cola
      </ProfileInfo>
      <Space>
        <Button
          type='primary'
          onClick={() => window.location.reload()}
        >
          Oke
        </Button>
        <Button
          onClick={toggleEditForm}
        >
          Cancel
        </Button>
      </Space>
    </>
  )
}
