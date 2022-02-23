import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Button } from 'primereact/button';
import React from 'react';
import { useCookies } from 'react-cookie';
import { Inplace } from './inplace';
import { Image } from 'primereact/image';
interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  const [cookies] = useCookies([PUBLIC_USER_INFO]);

  const publicData = cookies.public_user_info;

  return (
    <div style={{ width: '75%', paddingLeft: 10 }}>
      <h1 style={{ fontSize: '30px', marginLeft: 30 }}>Edit Profile</h1>
      <div
        style={{
          position: 'relative',
          width: 150,
          height: 150,
          marginLeft: 'calc(37.5%)',
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
          <Image src={publicData.photo} preview height='150' alt='Image Text' />
        </div>
        <Button
          style={{ position: 'absolute', bottom: 0, right: 0 }}
          className='p-button-raised p-button-rounded'
          icon='pi pi-pencil'
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
                defaultValue='Tien'
              />
            </div>
            <div>
              <Inplace
                label='Last Name'
                inputStyle={{ width: '300px' }}
                defaultValue='Phan'
              />
            </div>
          </div>
          <Inplace
            defaultValue='tienpvse@gmail.com'
            label='Email'
            inputStyle={{ width: '100%' }}
          />
          <Inplace
            defaultValue='+84 779 799 555'
            label='Contact number'
            inputStyle={{ width: '100%' }}
          />
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Inplace
                label='City'
                inputStyle={{ width: 300 }}
                defaultValue='Ho Chi Minh'
              />
            </div>
            <div>
              <Inplace
                label='State'
                inputStyle={{ width: 300 }}
                defaultValue='Default'
              />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div>
              <Inplace
                label='Zip code'
                inputStyle={{ width: 300 }}
                defaultValue='70000'
              />
            </div>
            <div>
              <Inplace
                label='Country'
                inputStyle={{ width: 300 }}
                defaultValue='Vietnam'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
