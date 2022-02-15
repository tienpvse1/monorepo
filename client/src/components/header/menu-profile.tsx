import { PUBLIC_USER_INFO } from '@constance/cookie';
import { Avatar, Dropdown } from 'antd';
import { useCookies } from 'react-cookie';
import { MenuProfile } from './dropdown/dropdown-profile';

export const DropdownProfile = () => {
  const [cookies] = useCookies([PUBLIC_USER_INFO]);

  const publicInfo = cookies.public_user_info;

  return (
    <Dropdown overlay={<MenuProfile />} trigger={['click']}>
      <div className='ant-dropdown-link'>
        <Avatar
          src={
            publicInfo.photo
              ? publicInfo.photo
              : 'https://buildyourspechere.com/wp-content/uploads/2020/10/placeholder-image-person-jpg-340x281.jpg'
          }
          size={30}
          style={{ marginBottom: '8px' }}
        />
        <span
          style={{
            fontSize: '17px',
            color: 'rgba(0,0,0,0.8)',
            paddingLeft: '12px',
            fontWeight: 600,
          }}
        >
          {publicInfo.firstName}
        </span>
      </div>
    </Dropdown>
  );
};
