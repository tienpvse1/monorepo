import { ProfileCardImg } from '@components/profile/profile-card-img';
import { Button, Col, Row } from 'antd';
import { ProfileInfo } from '@components/profile/profile-info';
import { useCookies } from 'react-cookie';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useToggle } from '@hooks/useToggle';
import { ProfileEditForm } from '@components/profile/profile-edit-form';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
const Profile = () => {
  const [cookies] = useCookies([PUBLIC_USER_INFO]);
  const publicData = cookies.public_user_info;
  const [isEditing, toggleEditForm] = useToggle();
  const toast = useRef<Toast>(null);

  const showToast = (message = 'success' || 'fail') => {
    if (message === 'fail') {
      toast.current.show({
        severity: 'warn',
        summary: 'update failed',
        detail: 'cannot update, please try again',
      });
    } else {
      toast.current.show({
        severity: 'success',
        summary: 'success',
        detail: 'profile has been updated',
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Row>
        <Col span={8}>
          <div className='container-page' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <ProfileCardImg publicData={publicData} showToast={showToast} />
            <div style={{ fontSize: '24px', fontWeight: '500', marginBottom: '15px' }}>
              {`${publicData.firstName} ${publicData.lastName}`}
            </div>
            <div style={{ fontSize: '18px' , textAlign: 'center'}}>
              Go dua thu duc, Ho Chi Minh, Vietnam
            </div>
          </div>
        </Col>
        <Col span={16}>
          <div className='container-page'>
            {isEditing ?
              <ProfileEditForm
                publicData={publicData}
                toggleEditForm={toggleEditForm}
              // showToast={showToast}
              /> :
              <>
                <ProfileInfo label='First Name'>
                  {publicData.firstName}
                </ProfileInfo>
                <ProfileInfo label='Last Name'>
                  {publicData.lastName}
                </ProfileInfo>
                <ProfileInfo label='Email'>
                  {publicData.email}
                </ProfileInfo>
                <ProfileInfo label='Phone'>
                  +84 779 799 555
                </ProfileInfo>
                <ProfileInfo label='Address'>
                  Go dua thu duc, Ho Chi Minh, Vietnam
                </ProfileInfo>
                <ProfileInfo label='Team'>
                  Team Coca Cola
                </ProfileInfo>
                <Button
                  type='primary'
                  onClick={toggleEditForm}
                >Edit
                </Button>
              </>
            }
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
