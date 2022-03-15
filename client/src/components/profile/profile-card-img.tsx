import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';
import { Image } from 'primereact/image';
import { useUpdateAccount } from '@modules/account/mutation/account.patch';
import { compressImage, uploadFiles } from '@util/file';
import { envVars } from '@env/var.env';
import { setCookie } from '@cookies';
import { imagePlaceHolderUrl } from '@constance/image';
interface ProfileCardImgProps {
  showToast: (message: 'success' | 'fail') => void;
  publicData: any;
}

export const ProfileCardImg: React.FC<ProfileCardImgProps> = ({ showToast, publicData }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageResource, setImageResource] = useState(publicData.photo);
  const { mutate } = useUpdateAccount();


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
    <>
      <div
        style={{
          position: 'relative',
          width: 150,
          height: 150,
          marginBottom: 15,
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
    </>
  )
}
