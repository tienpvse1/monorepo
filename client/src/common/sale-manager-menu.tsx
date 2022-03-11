import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

interface SaleManagerMenuProps {}

export const SaleManagerMenu: React.FC<SaleManagerMenuProps> = ({}) => {
  const navigate = useNavigate();
  return (
    <Menu
      defaultOpenKeys={['sub1']}
      // @ts-ignore
      selectedKeys={''}
      mode='inline'
    >
      <Menu.Item key={'sale-manage'}>Sale Manage</Menu.Item>
      <Menu.Item
        key={'pipeline'}
        onClick={() => navigate('/sale-manager/pipeline')}
      >
        Pipeline
      </Menu.Item>
      {/* <Menu.Item>Menu</Menu.Item> */}
    </Menu>
  );
};
