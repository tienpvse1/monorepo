import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Inplace } from './inplace';
import { Image } from 'primereact/image';
import { useUpdateAccount } from '@modules/account/mutation/account.patch';
import { compressImage, uploadFiles } from '@util/file';
import { envVars } from '@env/var.env';
import { Toast } from 'primereact/toast';
import { setCookie } from '@cookies';
import { imagePlaceHolderUrl } from '@constance/image';

interface ProfileDetailsProps {}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({}) => {
  const [cookies] = useCookies([PUBLIC_USER_INFO]);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useRef<Toast>(null);
  const publicData = cookies.public_user_info;
  const [imageResource, setImageResource] = useState(publicData.photo);
  const { mutate } = useUpdateAccount();

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

  const handleSubmit = async (photo: File) => {
    const compressedPhoto = await compressImage(photo, 0.1);
    const data = await uploadFiles([compressedPhoto]);
    const imageUrl = `${envVars.VITE_BE_DOMAIN}/files/${data[0].filename}`;
    mutate(
      {
        id: publicData.id,
        photo: `${imageUrl}`,
      },
      {
        onSuccess: () => {
          setCookie(
            PUBLIC_USER_INFO,
            JSON.stringify({ ...publicData, photo: imageUrl }),
            0.5
          );
          setImageResource(URL.createObjectURL(photo));
          showToast('success');
        },
        onError: () => {
          showToast('fail');
        },
      }
    );
  };

  return (
    <div style={{ width: '75%', paddingLeft: 10 }}>
      <Toast ref={toast} />

      <h1 style={{ fontSize: '30px', marginLeft: 30 }}>Edit Profile</h1>
      <div
        style={{
          position: 'relative',
          width: 150,
          height: 150,
          marginLeft: 'calc(37.5%)',
          marginBottom: 30,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '999px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={
              imageResource && imageResource.length > 10
                ? imageResource
                : imagePlaceHolderUrl
            }
            preview
            height='150'
            alt='Image Text'
          />
        </div>
        <input
          type='file'
          ref={inputRef}
          style={{ width: 0, height: 0 }}
          onChange={(e) => handleSubmit(e.target.files[0])}
          name=''
          id=''
        />
        <Button
          style={{ position: 'absolute', bottom: 0, right: 0 }}
          className='p-button-raised p-button-rounded'
          icon='pi pi-pencil'
          onClick={() => inputRef?.current.click()}
        />
      </div>
      <div style={{ width: '80%', marginLeft: '3%' }}>
        <div style={{ width: '100%', paddingLeft: '10%', paddingRight: '10%' }}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Inplace
                label='First Name'
                inputStyle={{ width: '300px' }}
                defaultValue={publicData.firstName}
                showToast={showToast}
              />
            </div>
            <div>
              <Inplace
                label='Last Name'
                inputStyle={{ width: '300px' }}
                defaultValue={publicData.lastName}
                field='lastName'
                showToast={showToast}
              />
            </div>
          </div>
          <Inplace
            defaultValue={publicData.email}
            label='Email'
            inputStyle={{ width: '100%' }}
            field='email'
            showToast={showToast}
          />
          <Inplace
            defaultValue='+84 779 799 555'
            label={publicData.phone}
            inputStyle={{ width: '100%' }}
            showToast={showToast}
          />
        </div>
      </div>
    </div>
  );
};
