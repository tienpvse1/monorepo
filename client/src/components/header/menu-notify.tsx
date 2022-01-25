import { BellOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { DropdownContent } from './dropdown/dropdown-notify';

export const DropdownNotify = () => {
  return (
    <Dropdown
      overlay={<DropdownContent />}
      trigger={['click']}
      placement='bottomRight'
      destroyPopupOnHide
    >
      <BellOutlined style={{ fontSize: '20px', color: 'rgba(0,0,0,0.8)' }} />
    </Dropdown>
  );
};
