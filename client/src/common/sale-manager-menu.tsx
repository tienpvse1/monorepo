import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

interface SaleManagerMenuProps {}

export const SaleManagerMenu: React.FC<SaleManagerMenuProps> = ({}) => {
  const navigate = useNavigate();
  const onMenuClick = (dest: string) => {
    return () => navigate(dest);
  };
  return (
    <Menu
      defaultOpenKeys={['sub1']}
      // @ts-ignore
      selectedKeys={''}
      mode='inline'
    >
      <Menu.Item onClick={onMenuClick('/sale-manager/')} key={'sale-manage'}>
        Sale Manage
      </Menu.Item>
      <Menu.Item
        key={'pipeline'}
        onClick={onMenuClick('/sale-manager/pipeline')}
      >
        Pipeline
      </Menu.Item>
    </Menu>
  );
};
