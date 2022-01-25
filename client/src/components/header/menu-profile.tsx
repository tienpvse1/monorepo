import { Avatar, Dropdown } from 'antd';
import { MenuProfile } from './dropdown/dropdown-profile';

export const DropdownProfile = () => {
  return (
    <Dropdown overlay={<MenuProfile />} trigger={['click']}>
      <div className='ant-dropdown-link'>
        <Avatar
          src='https://joeschmoe.io/api/v1/random'
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
          Tokuda
        </span>
      </div>
    </Dropdown>
  );
};
